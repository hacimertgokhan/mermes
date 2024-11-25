const io = require("socket.io")(3000, {
    cors: {
        origin: "*", // Tüm istemcilere izin ver
    },
});

io.on("connection", (socket) => {
    console.log("Yeni cihaz bağlandı:", socket.id);

    socket.on("send_message", (message) => {
        console.log("Gelen mesaj:", message);
        socket.broadcast.emit("receive_message", message); // Tüm cihazlara mesajı yayınla
    });

    socket.on("disconnect", () => {
        console.log("Cihaz bağlantısı kesildi:", socket.id);
    });
});
