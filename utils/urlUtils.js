exports.getRepoFromUrl = (url) => {
  const [owner, name] = url.split('/').slice(-2)
  return {owner, name}
}
