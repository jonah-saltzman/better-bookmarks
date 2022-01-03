import { urlRE } from "../constants"

const generateHtml = (tweet) => {
    const block = '<blockquote class="twitter-tweet" data-dnt="true" data-theme="dark">'
    const p = `<p lang="en" dir="ltr">${tweet.twtText.replace(urlRE, '')}</p>`
    const author = `&mdash; ${tweet.twtAuthor.name} (@${tweet.twtAuthor.username}) `
    const a = `<a href="https://twitter.com/${tweet.twtAuthor.username}/status/${tweet.twtId}?ref_src=twsrc%5Etfw">`
    const date = (new Date(Date.parse(tweet.twtDate))).toLocaleDateString(undefined, {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    })
    const close = '</a></blockquote>'
    return block + p + author + a + date + close
}

export default generateHtml

// <blockquote class="twitter-tweet" data-dnt="true" data-theme="dark">
// <p lang="en" dir="ltr">December the 31st be with you “Star Wars” fans ;)</p>
// &mdash; pregabalin fan account (@SAMOYEDWAVE) 
// <a href="https://twitter.com/SAMOYEDWAVE/status/1477005126824984584?ref_src=twsrc%5Etfw">December 31, 2021</a></blockquote>
