let apiKey;
let messageHistory = [];
let fineTuneResultData = null;

function setApiKey() {
    apiKey = document.getElementById('apiKeyInput').value;
}

async function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append('purpose', 'fine-tune');
    formData.append('file', file);

    const response = await fetch('https://api.openai.com/v1/files', {
        method: 'POST',
        headers: {
        'Authorization': `Bearer ${apiKey}`,
        },
        body: formData,
    });

    const data = await response.json();
    uploadResultData = data;
    document.getElementById('uploadResult').textContent = JSON.stringify(data, null, 2);
}


function downloadUploadResult() {
    if (uploadResultData) {
        const dataStr = JSON.stringify(uploadResultData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json;charset=utf-8' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'uploadResult.json';
        link.click();
    } else {
        alert("업로드 파일이 없습니다.");
    }
}

async function fineTune() {
    const trainingFile = document.getElementById('trainingFileId').value;
    const model = document.getElementById("model").value;
    const response = await fetch('https://api.openai.com/v1/fine-tunes', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
        training_file: trainingFile,
        model: model
        }),
    });

    const data = await response.json();
    fineTuneResultData = data;
    document.getElementById('fineTuneResult').textContent = JSON.stringify(data, null, 2);
}

function downloadFineTuneResult() {
    if (fineTuneResultData) {
        const dataStr = JSON.stringify(fineTuneResultData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json;charset=utf-8' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'fineTuneResult.json';
        link.click();
    } else {
        alert("파인튜닝 결과가 없습니다.");
    }
}

async function getFineTuneList() {
    const fileInput = document.getElementById('fineTuneResultFile');
    const file = fileInput.files[0];

    if (!file) {
        alert("파일을 선택해주세요.");
        return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
        const fineTuneResult = event.target.result;

        let parsedFineTuneResult;
        try {
            parsedFineTuneResult = JSON.parse(fineTuneResult);
        } catch (error) {
            alert("올바른 JSON 형식의 파인튜닝 파일을 넣어주세요.");
            return;
        }

        const trainingFile = parsedFineTuneResult.training_files[0].id;

        const response = await fetch('https://api.openai.com/v1/fine-tunes', {
            method: 'GET',
            headers: {
            'Authorization': `Bearer ${apiKey}`,
            },
        });

        const data = await response.json();

        if (data && data.data) {
            const filteredData = data.data.filter(fineTune => {
                return fineTune.training_files.some(file => file.id === trainingFile);
            });

            document.getElementById('fineTuneListResult').textContent = JSON.stringify(filteredData, null, 2);
        } else {
            alert("파인튜닝 정보를 가져올 수 없습니다.");
        }
    };
    reader.readAsText(file);
}

async function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value;

    addToHistory(message, '');

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: messageHistory,
            }),
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        const aiResponse = data.choices[0].message.content;
        addToHistory('', aiResponse);
        document.getElementById('chatResponse').textContent = JSON.stringify(aiResponse, null, 2);
    } catch (error) {
        console.error(error);
        alert('Error: ' + error.message);
    }
}

function addToHistory(userMessage, aiMessage) {
    const chatHistoryElement = document.getElementById('historyContainer');
    
    if (userMessage) {
        messageHistory.push({ role: 'user', content: userMessage });  
        const userMessageElement = document.createElement('div');
        userMessageElement.className = 'userMessage';
        userMessageElement.textContent = 'User: ' + userMessage;
        chatHistoryElement.appendChild(userMessageElement);
    }

    if (aiMessage) {
        messageHistory.push({ role: 'assistant', content: aiMessage });
        const aiMessageElement = document.createElement('div');
        aiMessageElement.className = 'aiMessage';
        aiMessageElement.textContent = 'AI: ' + aiMessage;
        chatHistoryElement.appendChild(aiMessageElement);
    }

    if (messageHistory.length > 10) {
        messageHistory.shift();
        messageHistory.shift();
        chatHistoryElement.removeChild(chatHistoryElement.firstChild);
        chatHistoryElement.removeChild(chatHistoryElement.firstChild);
    }
}
