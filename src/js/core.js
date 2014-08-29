(function(){
	function is_obj(o){
		this.base = o;
	}

	is_obj.implement = function(addOns){
		for (o in addOns){
			is_obj.prototype[o] = addOns[o];
		}
	}

	function is(o){
		return new is_obj(o);
	}

	is_obj.implement({
		// Find the type
		array: function(){
			return Object.prototype.toString.call(this.base) === '[object Array]';
		},
		object: function(){
			return Object.prototype.toString.call(this.base) === '[object Object]';
		},
		function: function(){
			return Object.prototype.toString.call(this.base) === '[object Function]';
		},
		number: function(){
			return typeof this.base === 'number';
		},
		string: function(){
			return typeof this.base === 'string';
		},

		// Merge Arrays
		arrayMerge: function(ary2){
			var len = ary2.length,
				i = 0;
			for (i; i < len; i++){
				this.base.push(ary2[i]);
			}
			return this.base;
		},

		// Find in array
		inArray: function(val){
			var len = this.base.length,
				i = 0;
			for (i; i < len; i++){
				if (this.base[i] == val){
					return {
						found: true,
						index: i
					}
				}
			}
			return false;
		},
		equals: function(obj){
			return JSON.stringify(this.base) === JSON.stringify(obj);
		},
		each: function(callback){
			var len = this.base.length;
			for (var i = 0; i < len; i++){
				callback(this.base[i], i);
			}
		},
		aryCalc: function(ignoreZero, sum){
			var sum = 0;
			var count = 0;
			this.each(function(item){
				if (is(item).number()){
					if (!ignoreZero && item != 0){
						sum += item;
						count++;
					}
				}
			});
			if (sum){
				return sum;
			}
			return sum / count;
		},
		avg: function(ignoreZero){
			return this.aryCalc(ignoreZero);
		},
		sum: function(){
			return this.aryCalc(false, true);
		},
		append: function(ele, html){
			ele.innerHTML += html;
		},
		modal: function(){
			var id = new Date().toISOString();
			this.append(document.body, '<div class="btn blue" modal="#' + id + '">Click Me</div><div class="modal" id="' + id + '"><div class="head"><div class="close"></div>' + this.base.title + '</div><div class="body">' + this.base.body + '</div><div class="footer"><div class="btn-group"><div class="btn btn-default" modal="#' + id + '">Close</div><div class="btn btn-default blue" modal="#' + id + '">Ok</div></div></div></div></div>');
		}
	});

	window.is = is;
})();