class ContactUs {
  process (args) {
    const { type, data } = args

    if(type === 'mail')
      this.mail(data)
  }

  mail (args) {

  }
}

export { ContactUs }
