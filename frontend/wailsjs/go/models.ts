export namespace main {
	
	export class FilterKeysSettings {
	
	
	    static createFrom(source: any = {}) {
	        return new FilterKeysSettings(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	
	    }
	}

}

