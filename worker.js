export default {
  async fetch(request, env) {
    // 1. 先尝试正常获取静态资源（JS, CSS, 图片等）
    let response = await env.ASSETS.fetch(request);

    // 2. 核心魔法：如果报了 404（找不到页面），说明用户在刷新前端路由
    // 强制把请求重写为访问根目录的 index.html
    if (response.status === 404) {
      const url = new URL(request.url);
      const indexRequest = new Request(url.origin + "/", request);
      response = await env.ASSETS.fetch(indexRequest);
    }

    return response;
  }
}
