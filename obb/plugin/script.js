"use strict";
// this variable is used to declare html `document`
var inputUser = document.querySelector("#inputUser"),
    chatUse = document.querySelector("#chatUse"),
    sendChat = document.querySelector("#sendChat"),
    remoteJid = document.querySelector("#remoteJid"),
    getNotife = document.querySelector("#showConfrim"),
    showLeght = document.querySelector("#showLeght"),
    showAndLimt = document.querySelector("#showLimit"),
    getNotifeUsage = document.querySelector("#usageLimit");
    
// this variable stores system settings data.
var globalChat = [],
    boolean = true, // true or false 
    save_csv = [],
    initialInputHeight = inputUser.scrollHeight,
    untils = JSON.parse(localStorage.getItem("DB")) || [],
    token = 80, // Infinity
    setTimeoutd = [17, 32, 50], // set the start time for the token to be reset
    safeInteger = parseInt(localStorage.getItem('StoreDB')) || 0;


function onUseTime() {
    // function to get the current time and day in "Day hh:mm format"
    return new Date().toLocaleString("en-US", {
        weekday: "short",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
    });
}

function useMultiAuthState(message, role) {
    untils.push({ role, message, time: onUseTime() });
    localStorage.setItem("DB", JSON.stringify(untils));
}

function loadDataFromHISTORY() {
    untils.forEach((chat) => {
        globalChat = chat.role === "client" ? "user_msg_" : "ai_msg_"; // get class From role
        chatUse.innerHTML += `<div class='${globalChat}'>${chat.message} <small class='time'>${chat.time}</small></div>`;
    });
}

function DOM_REMOVE_TOKEN() {
    localStorage.removeItem('StoreDB');
    alert(`Token has been reset! Happy using, ${Config.token} tokens are restored.`);
};

// calculates the remaining time until `reset_time` starts
if (boolean == false) {
    const targetTime = new Date();
    targetTime.setHours(setTimeoutd[0], setTimeoutd[1], setTimeoutd[2], 0);
    var timeToReset = targetTime - new Date();
    if (timeToReset < 0) timeToReset += 24 * 3600 * 1000; // add 24 hours if it has passed

    setTimeout(() => {
        DOM_REMOVE_TOKEN();
        setInterval(ResetLimitAsync, 24 * 3600 * 1000); // reset every 24 hours after the specified time
    }, timeToReset);
}

function shouldUp() {
    getNotife.style.display = "block";
    setTimeout(() => {
        getNotife.style.display = "none";
    }, 3000);
}

function shouldUpLimit() {
    getNotifeUsage.style.display = "block";
    setTimeout(() => {
        getNotifeUsage.style.display = "none";
    }, 3000);
}

const handleOutgoingChat = async () => {
    globalChat = inputUser.value.trim();
    if (!globalChat) return; // if chatInput is empty return from here
    inputUser.value = "";
    inputUser.style.height = `${initialInputHeight}px`;
    sendChat.disabled = true;
    sendChat.innerHTML = `<div class="spinner_"><svg width="25px" height="25px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" class="hds-flight-icon--animation-loading"><g fill="#343434" fill-rule="evenodd" clip-rule="evenodd"><path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z" opacity=".2"/><path d="M7.25.75A.75.75 0 018 0a8 8 0 018 8 .75.75 0 01-1.5 0A6.5 6.5 0 008 1.5a.75.75 0 01-.75-.75z"/></g></svg></div>`;

    //[CLIENT]//
    chatUse.innerHTML += `<div class='user_msg_'>${globalChat.replace(new RegExp(daatas["HARM_CATEGORY_DANGEROUS_CONTENT"].join("|"), "gi"), "****")} <small class='time'>${onUseTime()}</small></di>`;
    useMultiAuthState(globalChat, "client");

    try {
        const remainingUsage = token - safeInteger;
        const useMESSAGE = await useFitureMsg(globalChat);

        if (boolean && remainingUsage <= 0) {
            chatUse.innerHTML += "";
            return shouldUpLimit();
        } else if (boolean) {
            //[CHATBOT]//
            safeInteger++;
            localStorage.setItem("StoreDB", safeInteger);
            showAndLimt.innerText = `✦ ${remainingUsage}`;

            chatUse.innerHTML += `<div class='ai_msg_'>${useMESSAGE} <small class='time'>${onUseTime()}</small></div>`;
            useMultiAuthState(useMESSAGE, "system");

            globalChat = `${useMESSAGE.split(".")[0].substring(0, 23)}... .`;
            remoteJid.textContent = globalChat;
            localStorage.setItem("DB2", globalChat);
            localStorage.setItem("RemainingDB", remainingUsage);
        }
    } catch (error) {
        console.log(error.stack);
    } finally {
        sendChat.disabled = false;
        sendChat.innerHTML = `<svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="Arrow / Arrow_Up_MD"><path id="Vector" d="M12 19V5M12 5L6 11M12 5L18 11" stroke="#343434" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g></svg>`;
    }

    // give a pause while the client enters a command
    // use ` timeOf ` to set the number of cold wins
    var timeOf = 10;
    inputUser.disabled = true;
    const globalPREM = setInterval(() => {
        inputUser.placeholder =
            timeOf > 0 ?
            `Ask again after ${timeOf--}s` :
            (clearInterval(globalPREM),
                (inputUser.disabled = false),
                (inputUser.placeholder = "Give a message to Reapl"));
    }, 1000);

    chatUse.scrollTo(0, chatUse.scrollHeight); // scroll to bottom of the chat container
};

// Mic auto record
// confirms `even` records from chrome's native `SpeechRecognition()` APIs
const records = () => {
    var speech = true;
    window.SpeechRecognition = window.webkitSpeechRecognition;
    
    const recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.lang = "id-ID"; // region Indonesian

    recognition.addEventListener("result", e => {
        const transcript = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join("")
            .trim();

        inputUser.value = transcript; // show recorded text
    });

    if (speech == true) {
        recognition.start();
    }
}

inputUser.addEventListener("input", () => {
    inputUser.style.height = `${initialInputHeight}px`;
    inputUser.style.height = `${inputUser.scrollHeight}px`;
});

inputUser.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleOutgoingChat();
    }
});

function dellChat() {
    // remove the chats from local storage and call loadDataFromLocalstorage function
    if (confirm("Do you want to end all chats? Chat history will be deleted permanently.")) {
        shouldUp(); // Show notification 
        localStorage.removeItem("DB");
        localStorage.removeItem("DB2");
        localStorage.removeItem("DB3");
        remoteJid.innerHTML = "";
        chatUse.innerHTML = "";
    }
}

remoteJid.textContent = localStorage.getItem("DB2");
showAndLimt.innerText = `✦ ${localStorage.getItem("RemainingDB")}`;
sendChat.addEventListener("click", handleOutgoingChat);


loadDataFromHISTORY(); // start data viewer session



