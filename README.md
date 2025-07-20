# WebShotAPI

Welcome to WebShotAPI, a straightforward and reliable serverless API designed for capturing screenshots of web pages. Powered by Next.js and Puppeteer, it lets you generate tailored screenshots with just a simple GET request. You'll find support for different image formats, adjustable viewport sizes, mobile emulation, and other handy options. It's a great fit for apps that require on-the-fly web captures, whether for previews, reports, or automation.

## ⚙️ Installation

### 📝 Prerequisites

-   Node.js (v18+)
-   MongoDB (local or cloud instance)
-   Vercel account if you'd like to deploy it there (totally optional)

### 📥 Steps

1. Clone the repository to your local machine:

    ```
    git clone https://github.com/aarushkx/webshotapi.git
    cd webshotapi
    ```

2. Install the necessary dependencies:

    ```
    npm install
    ```

3. Create a .env.local file and add your MongoDB connection string:

    ```
    MONGODB_URI=your_mongodb_connection_string
    ```

4. Start the development server:
    ```
    npm run dev
    ```
    Then, head over to [http://localhost:3000](http://localhost:3000) in your browser to see the app in action.

## 🚀 Usage

Once everything's set up, using the API is a breeze.

### 🖼️ Generating a Screenshot

Simply send a GET request to the /api/screenshot endpoint, adding any query parameters to customize your capture.

Here's a quick example with cURL to get you started—it'll save a customized screenshot of example.com as a JPEG:

```
curl "http://localhost:3000/api/screenshot?url=https://example.com&w=1280&h=720&f=jpeg&q=80&fp=true&m=true&t=6000" -o screenshot.jpeg
```

## 📝 API Parameters

| Parameter | Alias | Type                   | Required | Default | Description                          |
| --------- | ----- | ---------------------- | -------- | ------- | ------------------------------------ |
| url       | -     | string (URL)           | Yes      | —       | The URL of the webpage to screenshot |
| width     | w     | number                 | No       | 1920    | Viewport width in pixels (min: 1)    |
| height    | h     | number                 | No       | 1080    | Viewport height in pixels (min: 1)   |
| format    | f     | enum (png, jpeg, webp) | No       | png     | Image format                         |
| quality   | q     | number (1-100)         | No       | 100     | Image quality (JPEG/WebP only)       |
| fullPage  | fp    | boolean                | No       | false   | Capture entire page height           |
| mobile    | m     | boolean                | No       | false   | Use mobile device viewport           |
| timeout   | t     | number (ms)            | No       | 0       | Page load timeout (max: 9000ms)      |

## 🧩 Examples

To give you a sense of how it works, here are a couple of simple requests:

-   For a basic screenshot: `/api/screenshot?url=https://example.com`
-   For a custom size and format: `/api/screenshot?url=https://example.com&w=1280&h=720&f=webp&q=85`

Feel free to mix and match these parameters to get exactly what you need.

## 🛠️ Configuration

-   **Database**: The app uses MongoDB to track usage stats. Just update the `MONGODB_URI` in your `.env.local` file to connect to your database.

## 🤝 Contributing

WebShotAPI is open to contributions. Here’s how you can get started:

1. Fork the repository.
2. Create a new feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

Thanks in advance for your contributions—we appreciate the community effort.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
