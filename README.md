### Mermes - Yerel Ağ Mesajlaşma Uygulaması

Mermes, **React Native** ve **Expo** kullanılarak geliştirilmiş, aynı ağ üzerindeki cihazlar arasında internet bağlantısı gerektirmeden mesajlaşma imkanı sunan bir uygulamadır. Uygulama, kullanıcıların yerel bir Wi-Fi ağı veya mobil erişim noktası üzerinden iletişim kurmasını sağlar.

## Özellikler

- **Yerel Ağ Mesajlaşması**: İnternet bağlantısı olmadan aynı ağdaki cihazlar arasında mesaj gönderimi.
- **Dinamik Mesaj Listesi**: Gönderilen mesajların anlık olarak görüntülenmesi.
- **Mesaj Kopyalama**: Bir mesaja tıklayarak metni panoya kopyalayabilirsiniz.
- **Kullanıcı Dostu Arayüz**: Basit ve sezgisel tasarım.

## Gereksinimler

- **Node.js** (16.x veya üzeri)
- **Expo CLI** (6.x veya üzeri)
- **React Native** (0.72 veya üzeri)
- Aynı Wi-Fi ağına bağlı en az iki cihaz veya bir cihaz ve onun mobil erişim noktası.

## Kurulum

1. **Projeyi klonlayın:**
   ```bash
   git clone https://github.com/hacimertgokhan/mermes.git
   cd mermes
   ```

2. **Bağımlılıkları yükleyin:**
   ```bash
   npm install
   ```

3. **Socket.io sunucusunu kurun:**
    - Sunucu için `socket.io` kurulumu yapmanız gerekmektedir.
    - Sunucuyu çalıştırmadan önce IP adresini cihazınızın yerel ağına göre ayarlayın.
    - Örnek `server.js` kodu:
      ```javascript
      const express = require("express");
      const http = require("http");
      const { Server } = require("socket.io");
 
      const app = express();
      const server = http.createServer(app);
      const io = new Server(server);
 
      io.on("connection", (socket) => {
        console.log("Bir kullanıcı bağlandı.");
        socket.on("sendMessage", (message) => {
          io.emit("receiveMessage", message);
        });
      });
 
      server.listen(3000, () => {
        console.log("Sunucu çalışıyor: http://<yerel-ip>:3000");
      });
      ```

   ```bash
   node server.js
   ```

4. **Uygulamayı başlatın:**
   ```bash
   expo start
   ```

5. **IP adresini güncelleyin:**
   `App.js` dosyasında `SOCKET_SERVER` değişkenini, Expo'nun başlattığı IP adresine göre güncelleyin.

## Kullanım

1. Uygulamayı başlatın ve cihazınızda açılan QR kodu tarayın.
2. Aynı ağdaki ikinci bir cihazda uygulamayı çalıştırın.
3. Mesaj göndererek iletişim kurmaya başlayın.

## Kütüphaneler

- [Expo](https://expo.dev/)
- [Socket.io](https://socket.io/)
- [@react-native-clipboard/clipboard](https://www.npmjs.com/package/@react-native-clipboard/clipboard)

## Gelecek Planlar

- **Emoji ve Medya Desteği**: Mesajlara görsel ve emojiler ekleme.
- **Bildirimler**: Yeni mesajlar için yerel bildirim desteği.
- **Tema Özelleştirmesi**: Kullanıcıların uygulama temasını değiştirebilmesi.

## Katkıda Bulunma

Katkıda bulunmak isterseniz, lütfen bir **pull request** açmadan önce bir **issue** oluşturun. Fikirlerinizi paylaşmaktan memnuniyet duyarız!

## Lisans
Bu proje [MIT Lisansı](LICENSE) altında lisanslanmıştır.

---

### Mermes - Local Network Messaging App

# Mermes

Mermes is a messaging application developed using **React Native** and **Expo** that allows communication between devices on the same network without requiring an internet connection. The app enables users to communicate via a local Wi-Fi network or a mobile hotspot.

## Features

- **Local Network Messaging**: Send messages between devices on the same network without an internet connection.
- **Dynamic Message List**: Messages are displayed instantly as they are sent.
- **Message Copying**: Tap on a message to copy its text to the clipboard.
- **User-Friendly Interface**: Simple and intuitive design.

## Requirements

- **Node.js** (16.x or later)
- **Expo CLI** (6.x or later)
- **React Native** (0.72 or later)
- At least two devices connected to the same Wi-Fi network, or one device acting as a mobile hotspot.

## Installation

1. **Clone the project:**
   ```bash
   git clone https://github.com/hacimertgokhan/mermes.git
   cd mermes
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up the Socket.io server:**
    - You need to set up a `socket.io` server.
    - Update the server's IP address to match your local network configuration.
    - Example `server.js` code:
      ```javascript
      const express = require("express");
      const http = require("http");
      const { Server } = require("socket.io");
 
      const app = express();
      const server = http.createServer(app);
      const io = new Server(server);
 
      io.on("connection", (socket) => {
        console.log("A user connected.");
        socket.on("sendMessage", (message) => {
          io.emit("receiveMessage", message);
        });
      });
 
      server.listen(3000, () => {
        console.log("Server running at http://<local-ip>:3000");
      });
      ```

   ```bash
   node server.js
   ```

4. **Start the application:**
   ```bash
   expo start
   ```

5. **Update the IP address:**
   Update the `SOCKET_SERVER` variable in the `App.js` file to match the IP address used by Expo.

## Usage

1. Launch the application and scan the QR code with your device.
2. Run the app on a second device connected to the same network.
3. Start sending messages to communicate.

## Libraries

- [Expo](https://expo.dev/)
- [Socket.io](https://socket.io/)
- [@react-native-clipboard/clipboard](https://www.npmjs.com/package/@react-native-clipboard/clipboard)

## Future Plans

- **Emoji and Media Support**: Add visuals and emojis to messages.
- **Notifications**: Local notification support for new messages.
- **Theme Customization**: Allow users to change the app's theme.

## Contributing

If you'd like to contribute, please create an **issue** before opening a **pull request**. We welcome your ideas and contributions!

## License

This project is licensed under the [MIT License](LICENSE).
