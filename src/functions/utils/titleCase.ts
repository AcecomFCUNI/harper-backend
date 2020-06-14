const toTitleCase = (phrase: string) => {
  const arrPhrase = phrase.toLowerCase().split(' ')

  const arrTitleCase = arrPhrase.map((word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1)
  })

  const phraseInTitleCase = arrTitleCase.join(' ')

  return phraseInTitleCase
}

export { toTitleCase }
