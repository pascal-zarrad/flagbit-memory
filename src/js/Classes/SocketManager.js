const ws = new WebSocket('ws://localhost:8080');
ws.onopen = function open() {
    ws.send('something');
};

ws.onmessage = function incoming(data) {
    console.log(data);
};