
function ChatOnWhatsapp(number, message=""){
    if(!number){return ;}
    let cleanNumber = String(number).replace(/\D/g, '');
    if (cleanNumber.length === 10) {
        cleanNumber = '91' + cleanNumber;
    }
    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}
export default ChatOnWhatsapp;