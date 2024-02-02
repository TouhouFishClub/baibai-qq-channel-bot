import Koa from 'koa';
import serve from 'koa-static';
import path from 'path';

const app = new Koa();
const PORT = 3000;

// 配置静态文件服务
app.use(serve(path.join(__dirname, '..', '/output')));

app.listen(PORT, () => {
  console.log(`[Koa Server] http://localhost:${PORT}`);
});
