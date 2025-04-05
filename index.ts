
Bun.serve({
  // Port를 따로 명시 하지 않을경우 $BUN_PORT, $PORT, $NODE_PORT 순서대로 사용하고 아무것도 지정하지 않을시 3000 사용
  // port: 8080, // defaults to $BUN_PORT, $PORT, $NODE_PORT otherwise 3000
  
  //0.0.0.0은 "모든 IP 주소에서 오는 요청을 수신하겠다"는 의미
  //hostname: "mydomain.com", // defaults to "0.0.0.0"
  fetch(req) {
    return new Response("Hello from bun server");
  },
});

console.log("Server running!!");