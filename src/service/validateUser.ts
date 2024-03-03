const validate = {
  Contact(contact: string): boolean {
    if (contact.length == 10) {
      const regex = /^\d+$/;
      return regex.test(contact);
    } else return false;
  },

  Email(email: string): boolean {
    const regex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;

    return regex.test(email);
  },

  Name(name: string) {
    const regex = /^[a-zA-Z ]+$/;
    return regex.test(name);
  },

  Password(password: string) {
    const regex = /^[a-zA-Z]+$/;
    return regex.test(password);
  },
};

export default validate;
