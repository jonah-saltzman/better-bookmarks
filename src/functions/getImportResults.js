
const getImportResults = (result, folderName) => {
    const resultObj = {}
    if (result.error) {
        resultObj.header = 'Failed to add Tweets'
        resultObj.body =
            'Logging in with Twitter may help. If you are already logged in with Twitter, ensure that your account has access to the Tweets you have selected.'
        resultObj.link = true
        resultObj.showBody = true
        resultObj.error = true
        return resultObj
    } else {
        resultObj.remaining = []
					.concat(result.message.apiErrIds)
					.concat(result.message.badIds)
        resultObj.header = `Added ${result.message.bookmarkedCount} Tweets to ${folderName}`
        resultObj.body =
            '' +
            (result.message.duplicateCount > 0
                ? `${result.message.duplicateCount} were already in folder.\n`
                : '') +
            (result.message.apiErrCount > 0
                ? `${result.message.apiErrCount} could not be bookmarked. Logging in with Twitter may help.\n`
                : '')
        resultObj.link = (result.message.apiErrCount > 0)
        resultObj.showBody = (resultObj.body.length >= 1)
        resultObj.error = false
        return resultObj
    }
}

export default getImportResults