import{r as P,B as T,k as _,z as S,o,l as s,O as i,q as h,h as k,G as g,p as r,L as p,j as f,A as N,t as L,n as C,a1 as q,Y as H,d as z,e as U,V as j,y as l,_ as R}from"./index-CRpbIdpG.js";const V={class:"page"},B={class:"page-header"},A={class:"tpl-tabs"},O=["onClick"],E={class:"tpl-name"},F={class:"tpl-desc"},M={class:"content"},D={class:"form-pane"},I={class:"form-list"},X={class:"form-label"},W={key:0,class:"req"},G=["onUpdate:modelValue","placeholder"],K={class:"output-pane"},Y={class:"pane-head"},J={class:"actions"},Q={class:"conf-output"},Z=P({__name:"NginxConfigPage",setup(ee){const b=j(),n=[{key:"reverse-proxy",name:"反向代理（HTTPS）",desc:"Nginx 前端 HTTPS 终止，反代到后端服务",fields:[{key:"serverName",label:"域名",placeholder:"example.com",default:"example.com",required:!0},{key:"upstream",label:"后端地址",placeholder:"http://127.0.0.1:8080",default:"http://127.0.0.1:8080",required:!0},{key:"certPath",label:"证书路径 (.pem/.crt)",placeholder:"/etc/nginx/certs/example.com.pem",default:"/etc/nginx/certs/example.com.pem"},{key:"keyPath",label:"私钥路径 (.key)",placeholder:"/etc/nginx/certs/example.com.key",default:"/etc/nginx/certs/example.com.key"},{key:"clientMaxBodySize",label:"上传体积限制",placeholder:"100m",default:"100m"}],render:e=>`server {
    listen 443 ssl http2;
    server_name ${e.serverName};

    ssl_certificate ${e.certPath};
    ssl_certificate_key ${e.keyPath};
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 1d;

    client_max_body_size ${e.clientMaxBodySize};

    access_log /var/log/nginx/${e.serverName}.access.log;
    error_log  /var/log/nginx/${e.serverName}.error.log warn;

    location / {
        proxy_pass ${e.upstream};
        proxy_set_header Host              $host;
        proxy_set_header X-Real-IP         $remote_addr;
        proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_http_version 1.1;
        proxy_read_timeout 60s;
    }
}`},{key:"static",name:"静态站点（HTTPS + SPA）",desc:"Vite/CRA 单页应用部署，含 gzip 与长期缓存",fields:[{key:"serverName",label:"域名",placeholder:"app.example.com",default:"app.example.com",required:!0},{key:"root",label:"静态目录",placeholder:"/var/www/app/dist",default:"/var/www/app/dist",required:!0},{key:"certPath",label:"证书路径",placeholder:"/etc/nginx/certs/app.example.com.pem",default:"/etc/nginx/certs/app.example.com.pem"},{key:"keyPath",label:"私钥路径",placeholder:"/etc/nginx/certs/app.example.com.key",default:"/etc/nginx/certs/app.example.com.key"}],render:e=>`server {
    listen 443 ssl http2;
    server_name ${e.serverName};

    ssl_certificate ${e.certPath};
    ssl_certificate_key ${e.keyPath};
    ssl_protocols TLSv1.2 TLSv1.3;

    root ${e.root};
    index index.html;

    gzip on;
    gzip_types text/css application/javascript application/json image/svg+xml;
    gzip_min_length 1024;

    # 长期缓存：带哈希的资源文件
    location ~* \\.(?:js|css|png|jpg|jpeg|gif|webp|svg|woff2?)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
        try_files $uri =404;
    }

    # SPA fallback：所有路由都返回 index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    access_log /var/log/nginx/${e.serverName}.access.log;
    error_log  /var/log/nginx/${e.serverName}.error.log warn;
}`},{key:"redirect",name:"HTTP → HTTPS 重定向",desc:"把所有 80 流量永久跳转到 443",fields:[{key:"serverName",label:"域名（可空格分隔多个）",placeholder:"example.com www.example.com",default:"example.com www.example.com",required:!0}],render:e=>`server {
    listen 80;
    server_name ${e.serverName};

    # 全部 301 跳转到 HTTPS
    return 301 https://$host$request_uri;
}`},{key:"websocket",name:"WebSocket 反代",desc:"带 Upgrade / Connection 头，长连接 1h 超时",fields:[{key:"serverName",label:"域名",placeholder:"ws.example.com",default:"ws.example.com",required:!0},{key:"upstream",label:"WebSocket 后端",placeholder:"http://127.0.0.1:9000",default:"http://127.0.0.1:9000",required:!0},{key:"path",label:"路由前缀",placeholder:"/ws",default:"/ws"},{key:"certPath",label:"证书路径",placeholder:"/etc/nginx/certs/ws.example.com.pem",default:"/etc/nginx/certs/ws.example.com.pem"},{key:"keyPath",label:"私钥路径",placeholder:"/etc/nginx/certs/ws.example.com.key",default:"/etc/nginx/certs/ws.example.com.key"}],render:e=>`# 升级 map（建议放在 http {} 顶层，每个域名共用一份）
map $http_upgrade $connection_upgrade {
    default upgrade;
    ''      close;
}

server {
    listen 443 ssl http2;
    server_name ${e.serverName};

    ssl_certificate ${e.certPath};
    ssl_certificate_key ${e.keyPath};
    ssl_protocols TLSv1.2 TLSv1.3;

    location ${e.path} {
        proxy_pass ${e.upstream};
        proxy_http_version 1.1;
        proxy_set_header Upgrade    $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
        proxy_set_header Host       $host;
        proxy_set_header X-Real-IP  $remote_addr;
        proxy_read_timeout 3600s;  # WebSocket 长连接
        proxy_send_timeout 3600s;
    }
}`}],d=T(n[0].key),c=_(()=>n.find(e=>e.key===d.value)??n[0]),m=S({});function y(e){if(!m[e.key]){const t={};e.fields.forEach(a=>t[a.key]=a.default??""),m[e.key]=t}return m[e.key]}const x=_(()=>y(c.value)),u=_(()=>{const e=c.value,t=y(e);return e.render(t)});function $(){navigator.clipboard.writeText(u.value).then(()=>f.success("已复制")).catch(()=>f.error("复制失败"))}function w(){const e=new Blob([u.value],{type:"text/plain;charset=utf-8"}),t=URL.createObjectURL(e),a=document.createElement("a");a.href=t,a.download=`${c.value.key}.conf`,a.click(),URL.revokeObjectURL(t)}return(e,t)=>(l(),o("div",V,[s("div",B,[s("button",{class:"back-btn",onClick:t[0]||(t[0]=a=>i(b).push("/"))},[h(i(N))]),t[1]||(t[1]=s("h2",{class:"page-title"},"Nginx 配置生成器",-1)),t[2]||(t[2]=s("span",{class:"page-subtitle"},"填几个字段，生成可粘贴的 conf",-1))]),s("div",A,[(l(),o(k,null,g(n,a=>s("button",{key:a.key,class:L(["tpl-tab",{active:d.value===a.key}]),onClick:v=>d.value=a.key},[s("div",E,p(a.name),1),s("div",F,p(a.desc),1)],10,O)),64))]),s("div",M,[s("section",D,[t[3]||(t[3]=s("div",{class:"pane-head"},"字段",-1)),s("div",I,[(l(!0),o(k,null,g(c.value.fields,a=>(l(),o("div",{key:a.key,class:"form-row"},[s("label",X,[r(p(a.label)+" ",1),a.required?(l(),o("span",W,"*")):C("",!0)]),q(s("input",{"onUpdate:modelValue":v=>x.value[a.key]=v,class:"form-input",placeholder:a.placeholder,spellcheck:"false"},null,8,G),[[H,x.value[a.key]]])]))),128))])]),s("section",K,[s("div",Y,[t[6]||(t[6]=s("span",null,"nginx.conf",-1)),s("div",J,[s("button",{class:"mini-btn",onClick:$},[h(i(z)),t[4]||(t[4]=r(" 复制 ",-1))]),s("button",{class:"mini-btn",onClick:w},[h(i(U)),t[5]||(t[5]=r(" 下载 ",-1))])])]),s("pre",Q,p(u.value),1)])]),t[7]||(t[7]=s("p",{class:"footer-tip"},[r(" 生成的配置仅作起点；真实环境请按需调整 "),s("code",null,"ssl_protocols"),r(" / "),s("code",null,"proxy_*"),r(" 等参数。 ")],-1))]))}}),se=R(Z,[["__scopeId","data-v-11800813"]]);export{se as default};
