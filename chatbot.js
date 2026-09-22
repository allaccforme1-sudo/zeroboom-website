// پاسخ‌های چت‌بات
const botResponses = {
    en: {
        greeting: "Hi! 👋 I'm ZeroBoom Assistant. How can I help you today?",
        services: "We offer:\n• Web Design 💻\n• E-commerce Stores 🛒\n• SEO Optimization 🚀\n• Support & Maintenance 🛠️\n\nWhich service interests you?",
        pricing: "Our pricing depends on your project. Basic websites start from $500, and e-commerce from $1000. Would you like a custom quote?",
        contact: "You can reach us at:\n📧 info@zeroboom.com\n📱 +98 912 345 6789\n\nOr fill out the contact form on our website!",
        about: "ZeroBoom is a web design agency founded by Aydin and Behnam. We help businesses grow from zero to summit! 🚀",
        order: "To start a project:\n1. Fill out the contact form\n2. We'll schedule a free consultation\n3. We'll send you a proposal\n4. After approval, we start working!\n\nReady to begin?",
        default: "I'm not sure I understand. Could you please rephrase? Or choose from the options below."
    },
    fa: {
        greeting: "سلام! 👋 من دستیار زیروبام هستم. چطور می‌تونم کمکتون کنم؟",
        services: "خدمات ما:\n• طراحی وب‌سایت 💻\n• فروشگاه اینترنتی 🛒\n• سئو و بهینه‌سازی 🚀\n• پشتیبانی و نگهداری 🛠️\n\nکدوم خدمت براتون جالبه؟",
        pricing: "قیمت‌ها بسته به پروژه متفاوته. سایت‌های پایه از ۵ میلیون تومان و فروشگاه‌ها از ۱۰ میلیون تومان شروع می‌شن. می‌خواید پیشنهاد قیمت بگیرید؟",
        contact: "می‌تونید از این راه‌ها با ما در تماس باشید:\n📧 info@zeroboom.com\n📱 ۰۹۱ ۳۴۵ ۶۸۹\n\nیا فرم تماس سایت رو پر کنید!",
        about: "زیروبام یه آژانس طراحی وب‌سایته که توسط آیدین و بهنام تأسیس شده. ما به کسب‌وکارها کمک می‌کنیم از صفر تا بام برسن! ",
        order: "برای شروع پروژه:\n۱. فرم تماس رو پر کنید\n۲. یه مشاوره رایگان هماهنگ می‌کنیم\n۳. پیشنهاد قیمت براتون می‌فرستیم\n۴. بعد از تایید، کار رو شروع می‌کنیم!\n\nآماده‌اید شروع کنیم؟",
        default: "متوجه نشدم. می‌شه دوباره بگید؟ یا از گزینه‌های زیر انتخاب کنید."
    }
};

const quickReplyLabels = {
    en: ['Services', 'Pricing', 'Contact', 'About Us', 'How to Order'],
    fa: ['خدمات', 'قیمت‌ها', 'تماس', 'درباره ما', 'نحوه سفارش']
};

const quickReplyKeys = ['services', 'pricing', 'contact', 'about', 'order'];

let currentChatLang = localStorage.getItem('lang') || 'en';

function getBotResponse(key) {
    return botResponses[currentChatLang][key] || botResponses[currentChatLang].default;
}

function toggleChatbot() {
    const chatbot = document.getElementById('chatbotWindow');
    chatbot.classList.toggle('active');
    
    if (chatbot.classList.contains('active')) {
        const messages = document.getElementById('chatbotMessages');
        if (messages.children.length === 0) {
            setTimeout(() => {
                addBotMessage(getBotResponse('greeting'));
                addQuickReplies();
            }, 500);
        }
    }
}

function addBotMessage(text) {
    const messages = document.getElementById('chatbotMessages');
    const message = document.createElement('div');
    message.className = 'message bot';
    message.textContent = text;
    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
}

function addUserMessage(text) {
    const messages = document.getElementById('chatbotMessages');
    const message = document.createElement('div');
    message.className = 'message user';
    message.textContent = text;
    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
}

function showTyping() {
    const messages = document.getElementById('chatbotMessages');
    const typing = document.createElement('div');
    typing.className = 'typing';
    typing.id = 'typingIndicator';
    typing.innerHTML = '<span></span><span></span><span></span>';
    messages.appendChild(typing);
    messages.scrollTop = messages.scrollHeight;
}

function hideTyping() {
    const typing = document.getElementById('typingIndicator');
    if (typing) typing.remove();
}

function addQuickReplies() {
    const messages = document.getElementById('chatbotMessages');
    const replies = document.createElement('div');
    replies.className = 'quick-replies';
    
    const options = quickReplyLabels[currentChatLang];
    
    options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'quick-reply';
        btn.textContent = option;
        btn.onclick = () => handleQuickReply(option, quickReplyKeys[index]);
        replies.appendChild(btn);
    });
    
    messages.appendChild(replies);
    messages.scrollTop = messages.scrollHeight;
}

function handleQuickReply(label, key) {
    addUserMessage(label);
    showTyping();
    
    setTimeout(() => {
        hideTyping();
        addBotMessage(getBotResponse(key));
        addQuickReplies();
    }, 1000);
}

function handleUserInput() {
    const input = document.getElementById('chatbotInput');
    const text = input.value.trim();
    
    if (text) {
        addUserMessage(text);
        input.value = '';
        showTyping();
        
        setTimeout(() => {
            hideTyping();
            addBotMessage(getBotResponse('default'));
            addQuickReplies();
        }, 1000);
    }
}

// تابع برای آپدیت زبان چت‌بات (وقتی کاربر زبان سایت رو عوض می‌کنه)
function updateChatbotLanguage(lang) {
    currentChatLang = lang;
    const messages = document.getElementById('chatbotMessages');
    if (messages && messages.children.length > 0) {
        messages.innerHTML = '';
        addBotMessage(getBotResponse('greeting'));
        addQuickReplies();
    }
    
    const input = document.getElementById('chatbotInput');
    if (input) {
        input.placeholder = lang === 'fa' ? 'پیام خود را بنویسید...' : 'Type your message...';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('chatbotInput');
    if (input) {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleUserInput();
        });
        input.placeholder = currentChatLang === 'fa' ? 'پیام خود را بنویسید...' : 'Type your message...';
    }
});
