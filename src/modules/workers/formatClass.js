const formatMsg = require("../format/formatMessage")
const formatSlash = require("../format/formatSlash")

class formatClass {
	constructor(prefix) {
		this.prefix = prefix;
		this.message = new formatMsg(this.prefix)
		this.slash = new formatSlash(this.prefix)
	}
}


module.exports = formatClass;
