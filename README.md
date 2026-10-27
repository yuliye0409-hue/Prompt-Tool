# Image Prompt Studio Universal Hover Edition

独立 Chrome / Edge 扩展，每位使用者需配置自己的 API Key。

- 鼠标停留网页图片约 700ms 打开弹窗，点击“生成此图提示词”后才请求 API。
- 只保留中文 Prompt、English Prompt 和各自复制按钮。
- 保留手动生成和中英文分别复制功能，使用通用图生文逻辑。
- API Key 和 Base URL 在扩展设置中配置。

在 Chrome 或 Edge 扩展管理页打开开发者模式，选择“加载已解压的扩展程序”，选择本目录。不要与完整版同时安装使用。

## 下载与配置
点击本仓库 Code → Download ZIP，解压后加载包含 manifest.json 的文件夹。刷新网页，悬停图片打开弹窗，点击“添加 API Key”打开设置，填写服务商、密钥、Base URL 和支持图片输入的模型后保存。也可从扩展详情打开“扩展程序选项”。

仓库不包含私人密钥或免费 API 额度，费用由所选服务商决定。图片会发送至用户配置的 API 服务，请勿上传未经授权的敏感内容。此版本不是普通网站，不能直接在 Safari 或 Firefox 中按上述方式安装。
