
const setupSocketIO = (io, db) => {

  io.on("connection", async (socket) => {

    const { userId, userType } = socket.handshake.query;
    const { token } = socket.handshake.auth;

    socket.on('disconnect', (reason) => {
      console.log(`disconnected: ${reason}`);
    });

    // * DEVELOPER SOCKET SETUP
    if (userId && token && userType === 'developer') {
      socket.join(`developer_${userId}`);

      // * EMIT MESSAGE HISTORY ON CONNECTION
      const messageHistory = await db.Message.findAll({
        where: { developer_id: userId },
        order: [['timestamp', 'DESC']],
        include: [
          { model: db.Company, as: 'company' },
          { model: db.Developer, as: 'developer' }
        ]
      });
      const chatsHistory = {};
      messageHistory.forEach((msg) => {
        const {
          id,
          text_content,
          timestamp,
          developer_id,
          company_id,
          is_from_developer,
          developer,
          company,
          was_read_by_company,
          was_read_by_developer
        } = msg.dataValues;

        const message = {id, text_content, timestamp, company_id, developer_id, is_from_developer, was_read_by_company, was_read_by_developer};

        if (!chatsHistory[company_id]) {
          chatsHistory[company_id] = {
            company,
            developer,
            last_timestamp: timestamp,
            company_unreads: was_read_by_company ? 0 : 1,
            developer_unreads: was_read_by_developer ? 0 : 1,
            messages: [message]
          }
        }
        else {
          chatsHistory[company_id].messages.push(message);
          if (!was_read_by_company) ++chatsHistory[company_id].company_unreads;
          if (!was_read_by_developer) ++chatsHistory[company_id].developer_unreads;
        }
      });

      socket.emit('message-history', Object.values(chatsHistory));

      // * HANDLE DEVELOPER MESSAGE
      socket.on('client-message', async ({message, targetId}) => {
        await db.Message.create({
          company_id: targetId,
          developer_id: userId,
          text_content: message,
          is_from_developer: true,
          was_read_by_company: false,
          was_read_by_developer: true,
          timestamp: Date.now()
        });

        const updatedChatMessages = await db.Message.findAll({
          where: { company_id: targetId, developer_id: userId },
          order: [['timestamp', 'DESC']],
          include: [
            { model: db.Company, as: 'company' },
            { model: db.Developer, as: 'developer' }
          ]
        });

        let updatedChat = {};
        updatedChatMessages.forEach((msg) => {
          const {
            id,
            text_content,
            timestamp,
            developer_id,
            company_id,
            is_from_developer,
            developer,
            company,
            was_read_by_company,
            was_read_by_developer
          } = msg.dataValues;

          const message = {id, text_content, timestamp, company_id, developer_id, is_from_developer, was_read_by_company, was_read_by_developer};

          if (!updatedChat.last_timestamp) {
            updatedChat = {
              company,
              developer,
              last_timestamp: timestamp,
              company_unreads: was_read_by_company ? 0 : 1,
              developer_unreads: was_read_by_developer ? 0 : 1,
              messages: [message]
            }
          }
          else {
            updatedChat.messages.push(message);
            if (!was_read_by_company) ++updatedChat.company_unreads;
            if (!was_read_by_developer) ++updatedChat.developer_unreads;
          }
        });

        io.to(`company_${targetId}`).emit('server-message', updatedChat);
        io.to(`developer_${userId}`).emit('server-message', updatedChat);
      });

      socket.on('client-read-message', async ({targetId}) => {
        await db.Message.update(
          {was_read_by_developer: true},
          {where: { company_id: targetId, developer_id: userId }}
        );
      });
    }

    // * COMPANY SOCKET SETUP
    else if (userId && token && userType === 'company') {
      socket.join(`company_${userId}`);

      // * EMIT MESSAGE HISTORY ON CONNECTION
      const messageHistory = await db.Message.findAll({
        where: { company_id: userId },
        order: [['timestamp', 'DESC']],
        include: [
          { model: db.Company, as: 'company' },
          { model: db.Developer, as: 'developer' }
        ]
      });
      const chatsHistory = {};
      messageHistory.forEach((msg) => {
        const {
          id,
          text_content,
          timestamp,
          developer_id,
          company_id,
          is_from_developer,
          developer,
          company,
          was_read_by_company,
          was_read_by_developer
        } = msg.dataValues;

        const message = {id, text_content, timestamp, company_id, developer_id, is_from_developer, was_read_by_company, was_read_by_developer};

        if (!chatsHistory[developer_id]) {
          chatsHistory[developer_id] = {
            company,
            developer,
            last_timestamp: timestamp,
            company_unreads: was_read_by_company ? 0 : 1,
            developer_unreads: was_read_by_developer ? 0 : 1,
            messages: [message]
          }
        }
        else {
          chatsHistory[developer_id].messages.push(message);
          if (!was_read_by_company) ++chatsHistory[developer_id].company_unreads;
          if (!was_read_by_developer) ++chatsHistory[developer_id].developer_unreads;
        }
      });

      socket.emit('message-history', Object.values(chatsHistory));

      // * HANDLE COMPANY MESSAGE
      socket.on('client-message', async ({message, targetId}) => {
        await db.Message.create({
          company_id: userId,
          developer_id: targetId,
          text_content: message,
          is_from_developer: false,
          was_read_by_company: true,
          was_read_by_developer: false,
          timestamp: Date.now()
        });

        const updatedChatMessages = await db.Message.findAll({
          where: { company_id: userId, developer_id: targetId },
          order: [['timestamp', 'DESC']],
          include: [
            { model: db.Company, as: 'company' },
            { model: db.Developer, as: 'developer' }
          ]
        });
        let updatedChat = {};
        updatedChatMessages.forEach((msg) => {
          const {
            id,
            text_content,
            timestamp,
            developer_id,
            company_id,
            is_from_developer,
            developer,
            company,
            was_read_by_company,
            was_read_by_developer
          } = msg.dataValues;

          const message = {id, text_content, timestamp, company_id, developer_id, is_from_developer, was_read_by_company, was_read_by_developer};

          if (!updatedChat.last_timestamp) {
            updatedChat = {
              company,
              developer,
              last_timestamp: timestamp,
              company_unreads: was_read_by_company ? 0 : 1,
              developer_unreads: was_read_by_developer ? 0 : 1,
              messages: [message]
            }
          }
          else {
            updatedChat.messages.push(message);
            if (!was_read_by_company) ++updatedChat.company_unreads;
            if (!was_read_by_developer) ++updatedChat.developer_unreads;
          }
        });

        io.to(`developer_${targetId}`).emit('server-message', updatedChat);
        io.to(`company_${userId}`).emit('server-message', updatedChat);
      });

      socket.on('client-read-message', async ({targetId}) => {
        await db.Message.update(
          {was_read_by_company: true},
          {where: { company_id: userId, developer_id: targetId }}
        );
      });
    }

    else socket.disconnect();
  });

}

module.exports = setupSocketIO;
