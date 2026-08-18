export const contacts = {
  fahim: {
    name: "Fahim Khan Chowdhury",
    phone: "+880 1854-226626",
    tel: "+8801854226626",
    whatsapp: "8801854226626",
  },
  minhajul: {
    name: "Mohammad Minhajul Islam",
    phone: "+880 1729-090609",
    tel: "+8801729090609",
    whatsapp: "8801729090609",
  },
};

export const primaryContact = contacts.fahim;

export function whatsappHref(waNumber, text) {
  const base = `https://wa.me/${waNumber}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
