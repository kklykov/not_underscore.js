/** @format */
;(function() {
	console.log('start not_underscore.js')

	// setting the root object
	var root =
		(typeof self == 'object' && self.self === self && self) ||
		(typeof global == 'object' && global.global === global && global) ||
		this ||
		{}

	var not_ = function(obj) {
		if (obj instanceof not_) return obj
		if (!(this instanceof not_)) return new not_(obj)
	}

	if (typeof exports != 'undefined' && !exports.nodeType) {
		if (typeof module != 'undefined' && !module.nodeType && module.exports) {
			exports = module.exports = not_
		}
		exports.not_ = not_
	} else {
		root.not_ = not_
	}

	not_.VERSION = '0.0.1'

	// I took the previous code from the original underscore library

	/*
    function: .each
    parameters -> 
                list: 
                iteratee:
  */

	not_.each = function(list, iteratee) {
		if (list instanceof Array) {
			list.forEach((element, index, list) => {
				iteratee(element, index, list)
			})
		} else {
			for (const prop in list) {
				iteratee(list[prop], prop, list)
			}
		}
		return list
	}

	/*
    function: .map
    parameters -> 
                list: 
                iteratee:
  */

	// not_.map = function(list, iteratee){
	//   if(list instanceof Array){
	//       let array = []
	//       list.forEach((element, index, list)=> {
	//         array[index] = iteratee(element, index, list)
	//       })
	//       return array
	//   }else{
	//       let obj = {}
	//       for(const prop in list){
	//         obj[prop] = iteratee(list[prop], prop, list)
	//       }
	//       return obj
	//   }
	// }

	not_.map = function(list, iteratee) {
		let array = []
		if (list instanceof Array) {
			list.forEach((element, index, list) => {
				array[index] = iteratee(element, index, list)
			})
		} else {
			let index = 0
			for (const prop in list) {
				array[index] = iteratee(list[prop], prop, list)
				index++
			}
		}
		return array
	}

	/*
    function: .reduce
    parameters -> 
                list: 
                iteratee:
                [memo]:
  */

	not_.reduce = function(list, iteratee, memo) {
		not_.map(list, function(value, index, self) {
			if (!memo) {
				memo = value
			} else {
				memo = iteratee(memo, value, index, self)
			}
		})
		return memo
	}

	/*
        function: .reduceRight
        parameters -> 
                    list: 
                    iteratee:
                    [memo]:
  */

	not_.reduceRight = function(list, iteratee, memo) {
		let obj = list
		let objKeys = []
		let isObject = false

		if (list instanceof Array === false) {
			obj = Object.values(list)
			objKeys = Object.keys(list)
			isObject = true
		}

		for (let index = obj.length; index >= 0; index--) {
			const element = obj[index]
			if (element) {
				if (!memo) {
					memo = element
				} else {
					memo = iteratee(memo, element, isObject ? objKeys[index] : index, list)
				}
			}
		}
		return memo
	}

	/*
        function: .find
        parameters -> 
                    list: 
                    predicate:
  */

	not_.find = function(list, predicate) {
		if (list instanceof Array) {
			for (let index = 0; index < list.length; index++) {
				const element = list[index]
				if (predicate(element, index, list)) return element
			}
		} else {
			for (const prop in list) {
				if (predicate(list[prop], prop, list)) return list[prop]
			}
		}

		return undefined
	}
})()
