define(["exports","require"],function(_exports,_require){"use strict";Object.defineProperty(_exports,"__esModule",{value:!0});_exports.insertNodeIntoTemplate=insertNodeIntoTemplate;_exports.property$1=_exports.property=property;_exports.query$1=_exports.query=query;_exports.queryAll$1=_exports.queryAll=queryAll;_exports.removeNodesFromTemplate=removeNodesFromTemplate;_exports.templateFactory$1=_exports.templateFactory=templateFactory;_exports.supportsAdoptingStyleSheets$1=_exports.supportsAdoptingStyleSheets=_exports.reparentNodes$1=_exports.reparentNodes=_exports.render$1=_exports.render$2=_exports.render=_exports.removeNodes$1=_exports.removeNodes=_exports.parts$1=_exports.parts=_exports.nothing$1=_exports.nothing=_exports.notEqual$1=_exports.notEqual=_exports.nodeMarker=_exports.noChange$1=_exports.noChange=_exports.markerRegex=_exports.marker=_exports.lastAttributeNameRegex=_exports.isTemplatePartActive$1=_exports.isTemplatePartActive=_exports.isPrimitive$1=_exports.isPrimitive=_exports.isIterable$1=_exports.isIterable=_exports.isDirective$1=_exports.isDirective=_exports.isCEPolyfill=_exports.html$2=_exports.html$1=_exports.html=_exports.eventOptions$1=_exports.eventOptions=_exports.directive$1=_exports.directive=_exports.defaultTemplateProcessor$1=_exports.defaultTemplateProcessor=_exports.defaultConverter$1=_exports.defaultConverter=_exports.customElement$1=_exports.customElement=_exports.css$1=_exports.css=_exports.createMarker$1=_exports.createMarker=_exports.boundAttributeSuffix=_exports.UpdatingElement$1=_exports.UpdatingElement=_exports.TemplateResult$3=_exports.TemplateResult$2=_exports.TemplateResult$1=_exports.TemplateResult=_exports.TemplateInstance$1=_exports.TemplateInstance=_exports.Template$1=_exports.Template=_exports.SVGTemplateResult$2=_exports.SVGTemplateResult$1=_exports.SVGTemplateResult=_exports.Router=_exports.Resolver=_exports.PropertyPart$1=_exports.PropertyPart=_exports.PropertyCommitter$1=_exports.PropertyCommitter=_exports.NodePart$1=_exports.NodePart=_exports.LitElement=_exports.EventPart$1=_exports.EventPart=_exports.DefaultTemplateProcessor$1=_exports.DefaultTemplateProcessor=_exports.CSSResult$1=_exports.CSSResult=_exports.BooleanAttributePart$1=_exports.BooleanAttributePart=_exports.AttributePart$1=_exports.AttributePart=_exports.AttributeCommitter$1=_exports.AttributeCommitter=_exports.$vaadinRouter=_exports.$updatingElement=_exports.$templateResult=_exports.$templateInstance=_exports.$templateFactory=_exports.$template=_exports.$shadyRender=_exports.$render=_exports.$parts=_exports.$part=_exports.$modifyTemplate=_exports.$litHtml=_exports.$litElement=_exports.$dom=_exports.$directive=_exports.$defaultTemplateProcessor=_exports.$decorators=_exports.$cssTag=void 0;_exports.unsafeCSS$1=_exports.unsafeCSS=_exports.templateCaches$1=_exports.templateCaches=_exports.svg$2=_exports.svg$1=_exports.svg=void 0;_require=babelHelpers.interopRequireWildcard(_require);function toArray(objectOrArray){objectOrArray=objectOrArray||[];return Array.isArray(objectOrArray)?objectOrArray:[objectOrArray]}function log(msg){return`[Vaadin.Router] ${msg}`}function logValue(value){if("object"!==typeof value){return value+""}const stringType=Object.prototype.toString.call(value).match(/ (.*)\]$/)[1];if("Object"===stringType||"Array"===stringType){return`${stringType} ${JSON.stringify(value)}`}else{return stringType}}const MODULE="module",NOMODULE="nomodule",bundleKeys=[MODULE,NOMODULE];function ensureBundle(src){if(!src.match(/.+\.[m]?js$/)){throw new Error(log(`Unsupported type for bundle "${src}": .js or .mjs expected.`))}}function ensureRoute(route){if(!route||!isString(route.path)){throw new Error(log(`Expected route config to be an object with a "path" string property, or an array of such objects`))}const bundle=route.bundle,stringKeys=["component","redirect","bundle"];if(!isFunction(route.action)&&!Array.isArray(route.children)&&!isFunction(route.children)&&!isObject(bundle)&&!stringKeys.some(key=>isString(route[key]))){throw new Error(log(`Expected route config "${route.path}" to include either "${stringKeys.join("\", \"")}" `+`or "action" function but none found.`))}if(bundle){if(isString(bundle)){ensureBundle(bundle)}else if(!bundleKeys.some(key=>key in bundle)){throw new Error(log("Expected route bundle to include either \""+NOMODULE+"\" or \""+MODULE+"\" keys, or both"))}else{bundleKeys.forEach(key=>key in bundle&&ensureBundle(bundle[key]))}}if(route.redirect){["bundle","component"].forEach(overriddenProp=>{if(overriddenProp in route){console.warn(log(`Route config "${route.path}" has both "redirect" and "${overriddenProp}" properties, `+`and "redirect" will always override the latter. Did you mean to only use "${overriddenProp}"?`))}})}}function ensureRoutes(routes){toArray(routes).forEach(route=>ensureRoute(route))}function loadScript(src,key){let script=document.head.querySelector("script[src=\""+src+"\"][async]");if(!script){script=document.createElement("script");script.setAttribute("src",src);if(key===MODULE){script.setAttribute("type",MODULE)}else if(key===NOMODULE){script.setAttribute(NOMODULE,"")}script.async=!0}return new Promise((resolve,reject)=>{script.onreadystatechange=script.onload=e=>{script.__dynamicImportLoaded=!0;resolve(e)};script.onerror=e=>{if(script.parentNode){script.parentNode.removeChild(script)}reject(e)};if(null===script.parentNode){document.head.appendChild(script)}else if(script.__dynamicImportLoaded){resolve()}})}function loadBundle(bundle){if(isString(bundle)){return loadScript(bundle)}else{return Promise.race(bundleKeys.filter(key=>key in bundle).map(key=>loadScript(bundle[key],key)))}}function fireRouterEvent(type,detail){return!window.dispatchEvent(new CustomEvent(`vaadin-router-${type}`,{cancelable:"go"===type,detail}))}function isObject(o){// guard against null passing the typeof check
return"object"===typeof o&&!!o}function isFunction(f){return"function"===typeof f}function isString(s){return"string"===typeof s}function getNotFoundError(context){const error=new Error(log(`Page not found (${context.pathname})`));error.context=context;error.code=404;return error}const notFoundResult=new class NotFoundResult{};/* istanbul ignore next: coverage is calculated in Chrome, this code is for IE */function getAnchorOrigin(anchor){// IE11: on HTTP and HTTPS the default port is not included into
// window.location.origin, so won't include it here either.
const port=anchor.port,protocol=anchor.protocol,defaultHttp="http:"===protocol&&"80"===port,defaultHttps="https:"===protocol&&"443"===port,host=defaultHttp||defaultHttps?anchor.hostname// does not include the port number (e.g. www.example.org)
:anchor.host;// does include the port number (e.g. www.example.org:80)
return`${protocol}//${host}`}// The list of checks is not complete:
//  - SVG support is missing
//  - the 'rel' attribute is not considered
function vaadinRouterGlobalClickHandler(event){// ignore the click if the default action is prevented
if(event.defaultPrevented){return}// ignore the click if not with the primary mouse button
if(0!==event.button){return}// ignore the click if a modifier key is pressed
if(event.shiftKey||event.ctrlKey||event.altKey||event.metaKey){return}// find the <a> element that the click is at (or within)
let anchor=event.target;const path=event.composedPath?event.composedPath():event.path||[];// FIXME(web-padawan): `Symbol.iterator` used by webcomponentsjs is broken for arrays
// example to check: `for...of` loop here throws the "Not yet implemented" error
for(let i=0;i<path.length;i++){const target=path[i];if(target.nodeName&&"a"===target.nodeName.toLowerCase()){anchor=target;break}}while(anchor&&"a"!==anchor.nodeName.toLowerCase()){anchor=anchor.parentNode}// ignore the click if not at an <a> element
if(!anchor||"a"!==anchor.nodeName.toLowerCase()){return}// ignore the click if the <a> element has a non-default target
if(anchor.target&&"_self"!==anchor.target.toLowerCase()){return}// ignore the click if the <a> element has the 'download' attribute
if(anchor.hasAttribute("download")){return}// ignore the click if the target URL is a fragment on the current page
if(anchor.pathname===window.location.pathname&&""!==anchor.hash){return}// ignore the click if the target is external to the app
// In IE11 HTMLAnchorElement does not have the `origin` property
const origin=anchor.origin||getAnchorOrigin(anchor);if(origin!==window.location.origin){return}// if none of the above, convert the click into a navigation event
const{pathname,search,hash}=anchor;if(fireRouterEvent("go",{pathname,search,hash})){event.preventDefault()}}/**
   * A navigation trigger for Vaadin Router that translated clicks on `<a>` links
   * into Vaadin Router navigation events.
   *
   * Only regular clicks on in-app links are translated (primary mouse button, no
   * modifier keys, the target href is within the app's URL space).
   *
   * @memberOf Router.Triggers
   * @type {NavigationTrigger}
   */const CLICK={activate(){window.document.addEventListener("click",vaadinRouterGlobalClickHandler)},inactivate(){window.document.removeEventListener("click",vaadinRouterGlobalClickHandler)}},isIE=/Trident/.test(navigator.userAgent);// PopStateEvent constructor shim
/* istanbul ignore next: coverage is calculated in Chrome, this code is for IE */if(isIE&&!isFunction(window.PopStateEvent)){window.PopStateEvent=function(inType,params){params=params||{};var e=document.createEvent("Event");e.initEvent(inType,!!params.bubbles,!!params.cancelable);e.state=params.state||null;return e};window.PopStateEvent.prototype=window.Event.prototype}function vaadinRouterGlobalPopstateHandler(event){if("vaadin-router-ignore"===event.state){return}const{pathname,search,hash}=window.location;fireRouterEvent("go",{pathname,search,hash})}/**
   * A navigation trigger for Vaadin Router that translates popstate events into
   * Vaadin Router navigation events.
   *
   * @memberOf Router.Triggers
   * @type {NavigationTrigger}
   */const POPSTATE={activate(){window.addEventListener("popstate",vaadinRouterGlobalPopstateHandler)},inactivate(){window.removeEventListener("popstate",vaadinRouterGlobalPopstateHandler)}};/**
    * Expose `pathToRegexp`.
    */var pathToRegexp_1=pathToRegexp,parse_1=parse,compile_1=compile,tokensToFunction_1=tokensToFunction,tokensToRegExp_1=tokensToRegExp,DEFAULT_DELIMITER="/",DEFAULT_DELIMITERS="./",PATH_REGEXP=new RegExp([// Match escaped characters that would otherwise appear in future matches.
// This allows the user to escape special characters that won't transform.
"(\\\\.)",// Match Express-style parameters and un-named parameters with a prefix
// and optional suffixes. Matches appear as:
//
// ":test(\\d+)?" => ["test", "\d+", undefined, "?"]
// "(\\d+)"  => [undefined, undefined, "\d+", undefined]
"(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?"].join("|"),"g");/**
                                                                                                         * Parse a string for the raw tokens.
                                                                                                         *
                                                                                                         * @param  {string}  str
                                                                                                         * @param  {Object=} options
                                                                                                         * @return {!Array}
                                                                                                         */function parse(str,options){var tokens=[],key=0,index=0,path="",defaultDelimiter=options&&options.delimiter||DEFAULT_DELIMITER,delimiters=options&&options.delimiters||DEFAULT_DELIMITERS,pathEscaped=!1,res;while(null!==(res=PATH_REGEXP.exec(str))){var m=res[0],escaped=res[1],offset=res.index;path+=str.slice(index,offset);index=offset+m.length;// Ignore already escaped sequences.
if(escaped){path+=escaped[1];pathEscaped=!0;continue}var prev="",next=str[index],name=res[2],capture=res[3],group=res[4],modifier=res[5];if(!pathEscaped&&path.length){var k=path.length-1;if(-1<delimiters.indexOf(path[k])){prev=path[k];path=path.slice(0,k)}}// Push the current path onto the tokens.
if(path){tokens.push(path);path="";pathEscaped=!1}var partial=""!==prev&&next!==void 0&&next!==prev,repeat="+"===modifier||"*"===modifier,optional="?"===modifier||"*"===modifier,delimiter=prev||defaultDelimiter,pattern=capture||group;tokens.push({name:name||key++,prefix:prev,delimiter:delimiter,optional:optional,repeat:repeat,partial:partial,pattern:pattern?escapeGroup(pattern):"[^"+escapeString(delimiter)+"]+?"})}// Push any remaining characters.
if(path||index<str.length){tokens.push(path+str.substr(index))}return tokens}/**
   * Compile a string to a template function for the path.
   *
   * @param  {string}             str
   * @param  {Object=}            options
   * @return {!function(Object=, Object=)}
   */function compile(str,options){return tokensToFunction(parse(str,options))}/**
   * Expose a method for transforming tokens into the path function.
   */function tokensToFunction(tokens){// Compile all the tokens into regexps.
// Compile all the patterns before compilation.
for(var matches=Array(tokens.length),i=0;i<tokens.length;i++){if("object"===typeof tokens[i]){matches[i]=new RegExp("^(?:"+tokens[i].pattern+")$")}}return function(data,options){for(var path="",encode=options&&options.encode||encodeURIComponent,i=0,token;i<tokens.length;i++){token=tokens[i];if("string"===typeof token){path+=token;continue}var value=data?data[token.name]:void 0,segment;if(Array.isArray(value)){if(!token.repeat){throw new TypeError("Expected \""+token.name+"\" to not repeat, but got array")}if(0===value.length){if(token.optional)continue;throw new TypeError("Expected \""+token.name+"\" to not be empty")}for(var j=0;j<value.length;j++){segment=encode(value[j],token);if(!matches[i].test(segment)){throw new TypeError("Expected all \""+token.name+"\" to match \""+token.pattern+"\"")}path+=(0===j?token.prefix:token.delimiter)+segment}continue}if("string"===typeof value||"number"===typeof value||"boolean"===typeof value){segment=encode(value+"",token);if(!matches[i].test(segment)){throw new TypeError("Expected \""+token.name+"\" to match \""+token.pattern+"\", but got \""+segment+"\"")}path+=token.prefix+segment;continue}if(token.optional){// Prepend partial segment prefixes.
if(token.partial)path+=token.prefix;continue}throw new TypeError("Expected \""+token.name+"\" to be "+(token.repeat?"an array":"a string"))}return path}}/**
   * Escape a regular expression string.
   *
   * @param  {string} str
   * @return {string}
   */function escapeString(str){return str.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")}/**
   * Escape the capturing group by escaping special characters and meaning.
   *
   * @param  {string} group
   * @return {string}
   */function escapeGroup(group){return group.replace(/([=!:$/()])/g,"\\$1")}/**
   * Get the flags for a regexp from the options.
   *
   * @param  {Object} options
   * @return {string}
   */function flags(options){return options&&options.sensitive?"":"i"}/**
   * Pull out keys from a regexp.
   *
   * @param  {!RegExp} path
   * @param  {Array=}  keys
   * @return {!RegExp}
   */function regexpToRegexp(path,keys){if(!keys)return path;// Use a negative lookahead to match only capturing groups.
var groups=path.source.match(/\((?!\?)/g);if(groups){for(var i=0;i<groups.length;i++){keys.push({name:i,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,pattern:null})}}return path}/**
   * Transform an array into a regexp.
   *
   * @param  {!Array}  path
   * @param  {Array=}  keys
   * @param  {Object=} options
   * @return {!RegExp}
   */function arrayToRegexp(path,keys,options){for(var parts=[],i=0;i<path.length;i++){parts.push(pathToRegexp(path[i],keys,options).source)}return new RegExp("(?:"+parts.join("|")+")",flags(options))}/**
   * Create a path regexp from string input.
   *
   * @param  {string}  path
   * @param  {Array=}  keys
   * @param  {Object=} options
   * @return {!RegExp}
   */function stringToRegexp(path,keys,options){return tokensToRegExp(parse(path,options),keys,options)}/**
   * Expose a function for taking tokens and returning a RegExp.
   *
   * @param  {!Array}  tokens
   * @param  {Array=}  keys
   * @param  {Object=} options
   * @return {!RegExp}
   */function tokensToRegExp(tokens,keys,options){options=options||{};// Iterate over the tokens and create our regexp string.
for(var strict=options.strict,start=!1!==options.start,end=!1!==options.end,delimiter=escapeString(options.delimiter||DEFAULT_DELIMITER),delimiters=options.delimiters||DEFAULT_DELIMITERS,endsWith=[].concat(options.endsWith||[]).map(escapeString).concat("$").join("|"),route=start?"^":"",isEndDelimited=0===tokens.length,i=0,token;i<tokens.length;i++){token=tokens[i];if("string"===typeof token){route+=escapeString(token);isEndDelimited=i===tokens.length-1&&-1<delimiters.indexOf(token[token.length-1])}else{var capture=token.repeat?"(?:"+token.pattern+")(?:"+escapeString(token.delimiter)+"(?:"+token.pattern+"))*":token.pattern;if(keys)keys.push(token);if(token.optional){if(token.partial){route+=escapeString(token.prefix)+"("+capture+")?"}else{route+="(?:"+escapeString(token.prefix)+"("+capture+"))?"}}else{route+=escapeString(token.prefix)+"("+capture+")"}}}if(end){if(!strict)route+="(?:"+delimiter+")?";route+="$"===endsWith?"$":"(?="+endsWith+")"}else{if(!strict)route+="(?:"+delimiter+"(?="+endsWith+"))?";if(!isEndDelimited)route+="(?="+delimiter+"|"+endsWith+")"}return new RegExp(route,flags(options))}/**
   * Normalize the given path string, returning a regular expression.
   *
   * An empty array can be passed in for the keys, which will hold the
   * placeholder key descriptions. For example, using `/user/:id`, `keys` will
   * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
   *
   * @param  {(string|RegExp|Array)} path
   * @param  {Array=}                keys
   * @param  {Object=}               options
   * @return {!RegExp}
   */function pathToRegexp(path,keys,options){if(path instanceof RegExp){return regexpToRegexp(path,keys)}if(Array.isArray(path)){return arrayToRegexp(/** @type {!Array} */path,keys,options)}return stringToRegexp(/** @type {string} */path,keys,options)}pathToRegexp_1.parse=parse_1;pathToRegexp_1.compile=compile_1;pathToRegexp_1.tokensToFunction=tokensToFunction_1;pathToRegexp_1.tokensToRegExp=tokensToRegExp_1;/**
                                                   * Universal Router (https://www.kriasoft.com/universal-router/)
                                                   *
                                                   * Copyright (c) 2015-present Kriasoft.
                                                   *
                                                   * This source code is licensed under the MIT license found in the
                                                   * LICENSE.txt file in the root directory of this source tree.
                                                   */const{hasOwnProperty}=Object.prototype,cache=new Map;// see https://github.com/pillarjs/path-to-regexp/issues/148
cache.set("|false",{keys:[],pattern:/(?:)/});function decodeParam(val){try{return decodeURIComponent(val)}catch(err){return val}}function matchPath(routepath,path,exact,parentKeys,parentParams){exact=!!exact;const cacheKey=`${routepath}|${exact}`;let regexp=cache.get(cacheKey);if(!regexp){const keys=[];regexp={keys,pattern:pathToRegexp_1(routepath,keys,{end:exact,strict:""===routepath})};cache.set(cacheKey,regexp)}const m=regexp.pattern.exec(path);if(!m){return null}const params=Object.assign({},parentParams);for(let i=1;i<m.length;i++){const key=regexp.keys[i-1],prop=key.name,value=m[i];if(value!==void 0||!hasOwnProperty.call(params,prop)){if(key.repeat){params[prop]=value?value.split(key.delimiter).map(decodeParam):[]}else{params[prop]=value?decodeParam(value):value}}}return{path:m[0],keys:(parentKeys||[]).concat(regexp.keys),params}}/**
   * Universal Router (https://www.kriasoft.com/universal-router/)
   *
   * Copyright (c) 2015-present Kriasoft.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */ /**
       * Traverses the routes tree and matches its nodes to the given pathname from
       * the root down to the leaves. Each match consumes a part of the pathname and
       * the matching process continues for as long as there is a matching child
       * route for the remaining part of the pathname.
       *
       * The returned value is a lazily evaluated iterator.
       *
       * The leading "/" in a route path matters only for the root of the routes
       * tree (or if all parent routes are ""). In all other cases a leading "/" in
       * a child route path has no significance.
       *
       * The trailing "/" in a _route path_ matters only for the leaves of the
       * routes tree. A leaf route with a trailing "/" matches only a pathname that
       * also has a trailing "/".
       *
       * The trailing "/" in a route path does not affect matching of child routes
       * in any way.
       *
       * The trailing "/" in a _pathname_ generally does not matter (except for
       * the case of leaf nodes described above).
       *
       * The "" and "/" routes have special treatment:
       *  1. as a single route
       *     the "" and "/" routes match only the "" and "/" pathnames respectively
       *  2. as a parent in the routes tree
       *     the "" route matches any pathname without consuming any part of it
       *     the "/" route matches any absolute pathname consuming its leading "/"
       *  3. as a leaf in the routes tree
       *     the "" and "/" routes match only if the entire pathname is consumed by
       *         the parent routes chain. In this case "" and "/" are equivalent.
       *  4. several directly nested "" or "/" routes
       *     - directly nested "" or "/" routes are 'squashed' (i.e. nesting two
       *       "/" routes does not require a double "/" in the pathname to match)
       *     - if there are only "" in the parent routes chain, no part of the
       *       pathname is consumed, and the leading "/" in the child routes' paths
       *       remains significant
       *
       * Side effect:
       *   - the routes tree { path: '' } matches only the '' pathname
       *   - the routes tree { path: '', children: [ { path: '' } ] } matches any
       *     pathname (for the tree root)
       *
       * Prefix matching can be enabled also by `children: true`.
       */function matchRoute(route,pathname,ignoreLeadingSlash,parentKeys,parentParams){let match,childMatches,childIndex=0,routepath=route.path||"";if("/"===routepath.charAt(0)){if(ignoreLeadingSlash){routepath=routepath.substr(1)}ignoreLeadingSlash=!0}return{next(routeToSkip){if(route===routeToSkip){return{done:!0}}const children=route.__children=route.__children||route.children;if(!match){match=matchPath(routepath,pathname,!children,parentKeys,parentParams);if(match){return{done:!1,value:{route,keys:match.keys,params:match.params,path:match.path}}}}if(match&&children){while(childIndex<children.length){if(!childMatches){const childRoute=children[childIndex];childRoute.parent=route;let matchedLength=match.path.length;if(0<matchedLength&&"/"===pathname.charAt(matchedLength)){matchedLength+=1}childMatches=matchRoute(childRoute,pathname.substr(matchedLength),ignoreLeadingSlash,match.keys,match.params)}const childMatch=childMatches.next(routeToSkip);if(!childMatch.done){return{done:!1,value:childMatch.value}}childMatches=null;childIndex++}}return{done:!0}}}}/**
   * Universal Router (https://www.kriasoft.com/universal-router/)
   *
   * Copyright (c) 2015-present Kriasoft.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */function resolveRoute(context){if(isFunction(context.route.action)){return context.route.action(context)}return void 0}/**
   * Universal Router (https://www.kriasoft.com/universal-router/)
   *
   * Copyright (c) 2015-present Kriasoft.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */function isChildRoute(parentRoute,childRoute){let route=childRoute;while(route){route=route.parent;if(route===parentRoute){return!0}}return!1}function generateErrorMessage(currentContext){let errorMessage=`Path '${currentContext.pathname}' is not properly resolved due to an error.`;const routePath=(currentContext.route||{}).path;if(routePath){errorMessage+=` Resolution had failed on route: '${routePath}'`}return errorMessage}function addRouteToChain(context,match){const{route,path}=match;function shouldDiscardOldChain(oldChain,route){return!route.parent||!oldChain||!oldChain.length||oldChain[oldChain.length-1].route!==route.parent}if(route&&!route.__synthetic){const item={path,route};if(shouldDiscardOldChain(context.chain,route)){context.chain=[item]}else{context.chain.push(item)}}}/**
   */class Resolver{constructor(routes,options={}){if(Object(routes)!==routes){throw new TypeError("Invalid routes")}this.baseUrl=options.baseUrl||"";this.errorHandler=options.errorHandler;this.resolveRoute=options.resolveRoute||resolveRoute;this.context=Object.assign({resolver:this},options.context);this.root=Array.isArray(routes)?{path:"",__children:routes,parent:null,__synthetic:!0}:routes;this.root.parent=null}/**
     * Returns the current list of routes (as a shallow copy). Adding / removing
     * routes to / from the returned array does not affect the routing config,
     * but modifying the route objects does.
     *
     * @return {!Array<!Router.Route>}
     */getRoutes(){return[...this.root.__children]}/**
     * Sets the routing config (replacing the existing one).
     *
     * @param {!Array<!Router.Route>|!Router.Route} routes a single route or an array of those
     *    (the array is shallow copied)
     */setRoutes(routes){ensureRoutes(routes);const newRoutes=[...toArray(routes)];this.root.__children=newRoutes}/**
     * Appends one or several routes to the routing config and returns the
     * effective routing config after the operation.
     *
     * @param {!Array<!Router.Route>|!Router.Route} routes a single route or an array of those
     *    (the array is shallow copied)
     * @return {!Array<!Router.Route>}
     * @protected
     */addRoutes(routes){ensureRoutes(routes);this.root.__children.push(...toArray(routes));return this.getRoutes()}/**
     * Removes all existing routes from the routing config.
     */removeRoutes(){this.setRoutes([])}/**
     * Asynchronously resolves the given pathname, i.e. finds all routes matching
     * the pathname and tries resolving them one after another in the order they
     * are listed in the routes config until the first non-null result.
     *
     * Returns a promise that is fulfilled with the return value of an object that consists of the first
     * route handler result that returns something other than `null` or `undefined` and context used to get this result.
     *
     * If no route handlers return a non-null result, or if no route matches the
     * given pathname the returned promise is rejected with a 'page not found'
     * `Error`.
     *
     * @param {!string|!{pathname: !string}} pathnameOrContext the pathname to
     *    resolve or a context object with a `pathname` property and other
     *    properties to pass to the route resolver functions.
     * @return {!Promise<any>}
     */resolve(pathnameOrContext){const context=Object.assign({},this.context,isString(pathnameOrContext)?{pathname:pathnameOrContext}:pathnameOrContext),match=matchRoute(this.root,this.__normalizePathname(context.pathname),this.baseUrl),resolve=this.resolveRoute;let matches=null,nextMatches=null,currentContext=context;function next(resume,parent=matches.value.route,prevResult){const routeToSkip=null===prevResult&&matches.value.route;matches=nextMatches||match.next(routeToSkip);nextMatches=null;if(!resume){if(matches.done||!isChildRoute(parent,matches.value.route)){nextMatches=matches;return Promise.resolve(notFoundResult)}}if(matches.done){return Promise.reject(getNotFoundError(context))}addRouteToChain(context,matches.value);currentContext=Object.assign({},context,matches.value);return Promise.resolve(resolve(currentContext)).then(resolution=>{if(null!==resolution&&resolution!==void 0&&resolution!==notFoundResult){currentContext.result=resolution.result||resolution;return currentContext}return next(resume,parent,resolution)})}context.next=next;return Promise.resolve().then(()=>next(!0,this.root)).catch(error=>{const errorMessage=generateErrorMessage(currentContext);if(!error){error=new Error(errorMessage)}else{console.warn(errorMessage)}error.context=error.context||currentContext;// DOMException has its own code which is read-only
if(!(error instanceof DOMException)){error.code=error.code||500}if(this.errorHandler){currentContext.result=this.errorHandler(error);return currentContext}throw error})}/**
     * URL constructor polyfill hook. Creates and returns an URL instance.
     */static __createUrl(url,base){return new URL(url,base)}/**
     * If the baseUrl property is set, transforms the baseUrl and returns the full
     * actual `base` string for using in the `new URL(path, base);` and for
     * prepernding the paths with. The returned base ends with a trailing slash.
     *
     * Otherwise, returns empty string.
     */get __effectiveBaseUrl(){return this.baseUrl?this.constructor.__createUrl(this.baseUrl,document.baseURI||document.URL).href.replace(/[^\/]*$/,""):""}/**
     * If the baseUrl is set, matches the pathname with the router’s baseUrl,
     * and returns the local pathname with the baseUrl stripped out.
     *
     * If the pathname does not match the baseUrl, returns undefined.
     *
     * If the `baseUrl` is not set, returns the unmodified pathname argument.
     */__normalizePathname(pathname){if(!this.baseUrl){// No base URL, no need to transform the pathname.
return pathname}const base=this.__effectiveBaseUrl,normalizedUrl=this.constructor.__createUrl(pathname,base).href;if(normalizedUrl.slice(0,base.length)===base){return normalizedUrl.slice(base.length)}}}_exports.Resolver=Resolver;Resolver.pathToRegexp=pathToRegexp_1;/**
                                         * Universal Router (https://www.kriasoft.com/universal-router/)
                                         *
                                         * Copyright (c) 2015-present Kriasoft.
                                         *
                                         * This source code is licensed under the MIT license found in the
                                         * LICENSE.txt file in the root directory of this source tree.
                                         */const{pathToRegexp:pathToRegexp$1}=Resolver,cache$1=new Map;function cacheRoutes(routesByName,route,routes){const name=route.name||route.component;if(name){if(routesByName.has(name)){routesByName.get(name).push(route)}else{routesByName.set(name,[route])}}if(Array.isArray(routes)){for(let i=0;i<routes.length;i++){const childRoute=routes[i];childRoute.parent=route;cacheRoutes(routesByName,childRoute,childRoute.__children||childRoute.children)}}}function getRouteByName(routesByName,routeName){const routes=routesByName.get(routeName);if(routes&&1<routes.length){throw new Error(`Duplicate route with name "${routeName}".`+` Try seting unique 'name' route properties.`)}return routes&&routes[0]}function getRoutePath(route){let path=route.path;path=Array.isArray(path)?path[0]:path;return path!==void 0?path:""}function generateUrls(router,options={}){if(!(router instanceof Resolver)){throw new TypeError("An instance of Resolver is expected")}const routesByName=new Map;return(routeName,params)=>{let route=getRouteByName(routesByName,routeName);if(!route){routesByName.clear();// clear cache
cacheRoutes(routesByName,router.root,router.root.__children);route=getRouteByName(routesByName,routeName);if(!route){throw new Error(`Route "${routeName}" not found`)}}let regexp=cache$1.get(route.fullPath);if(!regexp){let fullPath=getRoutePath(route),rt=route.parent;while(rt){const path=getRoutePath(rt);if(path){fullPath=path.replace(/\/$/,"")+"/"+fullPath.replace(/^\//,"")}rt=rt.parent}const tokens=pathToRegexp$1.parse(fullPath),toPath=pathToRegexp$1.tokensToFunction(tokens),keys=Object.create(null);for(let i=0;i<tokens.length;i++){if(!isString(tokens[i])){keys[tokens[i].name]=!0}}regexp={toPath,keys};cache$1.set(fullPath,regexp);route.fullPath=fullPath}let url=regexp.toPath(params,options)||"/";if(options.stringifyQueryParams&&params){const queryParams={},keys=Object.keys(params);for(let i=0;i<keys.length;i++){const key=keys[i];if(!regexp.keys[key]){queryParams[key]=params[key]}}const query=options.stringifyQueryParams(queryParams);if(query){url+="?"===query.charAt(0)?query:`?${query}`}}return url}}/**
   * @typedef NavigationTrigger
   * @type {object}
   * @property {function()} activate
   * @property {function()} inactivate
   */ /** @type {Array<NavigationTrigger>} */let triggers=[];function setNavigationTriggers(newTriggers){triggers.forEach(trigger=>trigger.inactivate());newTriggers.forEach(trigger=>trigger.activate());triggers=newTriggers}const willAnimate=elem=>{const name=getComputedStyle(elem).getPropertyValue("animation-name");return name&&"none"!==name},waitForAnimation=(elem,cb)=>{const listener=()=>{elem.removeEventListener("animationend",listener);cb()};elem.addEventListener("animationend",listener)};function animate(elem,className){elem.classList.add(className);return new Promise(resolve=>{if(willAnimate(elem)){const rect=elem.getBoundingClientRect(),size=`height: ${rect.bottom-rect.top}px; width: ${rect.right-rect.left}px`;elem.setAttribute("style",`position: absolute; ${size}`);waitForAnimation(elem,()=>{elem.classList.remove(className);elem.removeAttribute("style");resolve()})}else{elem.classList.remove(className);resolve()}})}const MAX_REDIRECT_COUNT=256;function isResultNotEmpty(result){return null!==result&&result!==void 0}function copyContextWithoutNext(context){const copy=Object.assign({},context);delete copy.next;return copy}function createLocation({pathname="",search="",hash="",chain=[],params={},redirectFrom,resolver},route){const routes=chain.map(item=>item.route);return{baseUrl:resolver&&resolver.baseUrl||"",pathname,search,hash,routes,route:route||routes.length&&routes[routes.length-1]||null,params,redirectFrom,getUrl:(userParams={})=>getPathnameForRouter(Router.pathToRegexp.compile(getMatchedPath(routes))(Object.assign({},params,userParams)),resolver)}}function createRedirect(context,pathname){const params=Object.assign({},context.params);return{redirect:{pathname,from:context.pathname,params}}}function renderElement(context,element){element.location=createLocation(context);const index=context.chain.map(item=>item.route).indexOf(context.route);context.chain[index].element=element;return element}function runCallbackIfPossible(callback,args,thisArg){if(isFunction(callback)){return callback.apply(thisArg,args)}}function amend(amendmentFunction,args,element){return amendmentResult=>{if(amendmentResult&&(amendmentResult.cancel||amendmentResult.redirect)){return amendmentResult}if(element){return runCallbackIfPossible(element[amendmentFunction],args,element)}}}function processNewChildren(newChildren,route){if(!Array.isArray(newChildren)&&!isObject(newChildren)){throw new Error(log(`Incorrect "children" value for the route ${route.path}: expected array or object, but got ${newChildren}`))}route.__children=[];const childRoutes=toArray(newChildren);for(let i=0;i<childRoutes.length;i++){ensureRoute(childRoutes[i]);route.__children.push(childRoutes[i])}}function removeDomNodes(nodes){if(nodes&&nodes.length){const parent=nodes[0].parentNode;for(let i=0;i<nodes.length;i++){parent.removeChild(nodes[i])}}}function getPathnameForRouter(pathname,router){const base=router.__effectiveBaseUrl;return base?router.constructor.__createUrl(pathname.replace(/^\//,""),base).pathname:pathname}function getMatchedPath(chain){return chain.map(item=>item.path).reduce((a,b)=>{if(b.length){return a.replace(/\/$/,"")+"/"+b.replace(/^\//,"")}return a},"")}/**
   * A simple client-side router for single-page applications. It uses
   * express-style middleware and has a first-class support for Web Components and
   * lazy-loading. Works great in Polymer and non-Polymer apps.
   *
   * Use `new Router(outlet, options)` to create a new Router instance.
   *
   * * The `outlet` parameter is a reference to the DOM node to render
   *   the content into.
   *
   * * The `options` parameter is an optional object with options. The following
   *   keys are supported:
   *   * `baseUrl` — the initial value for [
   *     the `baseUrl` property
   *   ](#/classes/Router#property-baseUrl)
   *
   * The Router instance is automatically subscribed to navigation events
   * on `window`.
   *
   * See [Live Examples](#/classes/Router/demos/demo/index.html) for the detailed usage demo and code snippets.
   *
   * See also detailed API docs for the following methods, for the advanced usage:
   *
   * * [setOutlet](#/classes/Router#method-setOutlet) – should be used to configure the outlet.
   * * [setTriggers](#/classes/Router#method-setTriggers) – should be used to configure the navigation events.
   * * [setRoutes](#/classes/Router#method-setRoutes) – should be used to configure the routes.
   *
   * Only `setRoutes` has to be called manually, others are automatically invoked when creating a new instance.
   *
   * @extends Resolver
   * @demo demo/index.html
   * @summary JavaScript class that renders different DOM content depending on
   *    a given path. It can re-render when triggered or automatically on
   *    'popstate' and / or 'click' events.
   */class Router extends Resolver{/**
   * Creates a new Router instance with a given outlet, and
   * automatically subscribes it to navigation events on the `window`.
   * Using a constructor argument or a setter for outlet is equivalent:
   *
   * ```
   * const router = new Router();
   * router.setOutlet(outlet);
   * ```
   * @param {?Node=} outlet
   * @param {?Router.Options=} options
   */constructor(outlet,options){const baseElement=document.head.querySelector("base"),baseHref=baseElement&&baseElement.getAttribute("href");super([],Object.assign({// Default options
baseUrl:baseHref&&Resolver.__createUrl(baseHref,document.URL).pathname.replace(/[^\/]*$/,"")},options));this.resolveRoute=context=>this.__resolveRoute(context);const triggers=Router.NavigationTrigger;Router.setTriggers.apply(Router,Object.keys(triggers).map(key=>triggers[key]));/**
                                                                                        * The base URL for all routes in the router instance. By default,
                                                                                        * if the base element exists in the `<head>`, vaadin-router
                                                                                        * takes the `<base href>` attribute value, resolves against current `document.URL`
                                                                                        * and gets the `pathname` from the result.
                                                                                        *
                                                                                        * @public
                                                                                        * @type {string}
                                                                                        */this.baseUrl;/**
                   * A promise that is settled after the current render cycle completes. If
                   * there is no render cycle in progress the promise is immediately settled
                   * with the last render cycle result.
                   *
                   * @public
                   * @type {!Promise<!Router.Location>}
                   */this.ready;this.ready=Promise.resolve(outlet);/**
                                           * Contains read-only information about the current router location:
                                           * pathname, active routes, parameters. See the
                                           * [Location type declaration](#/classes/Router.Location)
                                           * for more details.
                                           *
                                           * @public
                                           * @type {!Router.Location}
                                           */this.location;this.location=createLocation({resolver:this});this.__lastStartedRenderId=0;this.__navigationEventHandler=this.__onNavigationEvent.bind(this);this.setOutlet(outlet);this.subscribe();// Using WeakMap instead of WeakSet because WeakSet is not supported by IE11
this.__createdByRouter=new WeakMap;this.__addedByRouter=new WeakMap}__resolveRoute(context){const route=context.route;let callbacks=Promise.resolve();if(isFunction(route.children)){callbacks=callbacks.then(()=>route.children(copyContextWithoutNext(context))).then(children=>{// The route.children() callback might have re-written the
// route.children property instead of returning a value
if(!isResultNotEmpty(children)&&!isFunction(route.children)){children=route.children}processNewChildren(children,route)})}const commands={redirect:path=>createRedirect(context,path),component:component=>{const element=document.createElement(component);this.__createdByRouter.set(element,!0);return element}};return callbacks.then(()=>{if(this.__isLatestRender(context)){return runCallbackIfPossible(route.action,[context,commands],route)}}).then(result=>{if(isResultNotEmpty(result)){// Actions like `() => import('my-view.js')` are not expected to
// end the resolution, despite the result is not empty. Checking
// the result with a whitelist of values that end the resolution.
if(result instanceof HTMLElement||result.redirect||result===notFoundResult){return result}}if(isString(route.redirect)){return commands.redirect(route.redirect)}if(route.bundle){return loadBundle(route.bundle).then(()=>{},()=>{throw new Error(log(`Bundle not found: ${route.bundle}. Check if the file name is correct`))})}}).then(result=>{if(isResultNotEmpty(result)){return result}if(isString(route.component)){return commands.component(route.component)}})}/**
     * Sets the router outlet (the DOM node where the content for the current
     * route is inserted). Any content pre-existing in the router outlet is
     * removed at the end of each render pass.
     *
     * NOTE: this method is automatically invoked first time when creating a new Router instance.
     *
     * @param {?Node} outlet the DOM node where the content for the current route
     *     is inserted.
     */setOutlet(outlet){if(outlet){this.__ensureOutlet(outlet)}this.__outlet=outlet}/**
     * Returns the current router outlet. The initial value is `undefined`.
     *
     * @return {?Node} the current router outlet (or `undefined`)
     */getOutlet(){return this.__outlet}/**
     * Sets the routing config (replacing the existing one) and triggers a
     * navigation event so that the router outlet is refreshed according to the
     * current `window.location` and the new routing config.
     *
     * Each route object may have the following properties, listed here in the processing order:
     * * `path` – the route path (relative to the parent route if any) in the
     * [express.js syntax](https://expressjs.com/en/guide/routing.html#route-paths").
     *
     * * `children` – an array of nested routes or a function that provides this
     * array at the render time. The function can be synchronous or asynchronous:
     * in the latter case the render is delayed until the returned promise is
     * resolved. The `children` function is executed every time when this route is
     * being rendered. This allows for dynamic route structures (e.g. backend-defined),
     * but it might have a performance impact as well. In order to avoid calling
     * the function on subsequent renders, you can override the `children` property
     * of the route object and save the calculated array there
     * (via `context.route.children = [ route1, route2, ...];`).
     * Parent routes are fully resolved before resolving the children. Children
     * 'path' values are relative to the parent ones.
     *
     * * `action` – the action that is executed before the route is resolved.
     * The value for this property should be a function, accepting `context`
     * and `commands` parameters described below. If present, this function is
     * always invoked first, disregarding of the other properties' presence.
     * The action can return a result directly or within a `Promise`, which
     * resolves to the result. If the action result is an `HTMLElement` instance,
     * a `commands.component(name)` result, a `commands.redirect(path)` result,
     * or a `context.next()` result, the current route resolution is finished,
     * and other route config properties are ignored.
     * See also **Route Actions** section in [Live Examples](#/classes/Router/demos/demo/index.html).
     *
     * * `redirect` – other route's path to redirect to. Passes all route parameters to the redirect target.
     * The target route should also be defined.
     * See also **Redirects** section in [Live Examples](#/classes/Router/demos/demo/index.html).
     *
     * * `bundle` – string containing the path to `.js` or `.mjs` bundle to load before resolving the route,
     * or the object with "module" and "nomodule" keys referring to different bundles.
     * Each bundle is only loaded once. If "module" and "nomodule" are set, only one bundle is loaded,
     * depending on whether the browser supports ES modules or not.
     * The property is ignored when either an `action` returns the result or `redirect` property is present.
     * Any error, e.g. 404 while loading bundle will cause route resolution to throw.
     * See also **Code Splitting** section in [Live Examples](#/classes/Router/demos/demo/index.html).
     *
     * * `component` – the tag name of the Web Component to resolve the route to.
     * The property is ignored when either an `action` returns the result or `redirect` property is present.
     * If route contains the `component` property (or an action that return a component)
     * and its child route also contains the `component` property, child route's component
     * will be rendered as a light dom child of a parent component.
     *
     * * `name` – the string name of the route to use in the
     * [`router.urlForName(name, params)`](#/classes/Router#method-urlForName)
     * navigation helper method.
     *
     * For any route function (`action`, `children`) defined, the corresponding `route` object is available inside the callback
     * through the `this` reference. If you need to access it, make sure you define the callback as a non-arrow function
     * because arrow functions do not have their own `this` reference.
     *
     * `context` object that is passed to `action` function holds the following properties:
     * * `context.pathname` – string with the pathname being resolved
     *
     * * `context.search` – search query string
     *
     * * `context.hash` – hash string
     *
     * * `context.params` – object with route parameters
     *
     * * `context.route` – object that holds the route that is currently being rendered.
     *
     * * `context.next()` – function for asynchronously getting the next route
     * contents from the resolution chain (if any)
     *
     * `commands` object that is passed to `action` function has
     * the following methods:
     *
     * * `commands.redirect(path)` – function that creates a redirect data
     * for the path specified.
     *
     * * `commands.component(component)` – function that creates a new HTMLElement
     * with current context. Note: the component created by this function is reused if visiting the same path twice in row.
     *
     *
     * @param {!Array<!Router.Route>|!Router.Route} routes a single route or an array of those
     * @param {?boolean} skipRender configure the router but skip rendering the
     *     route corresponding to the current `window.location` values
     *
     * @return {!Promise<!Node>}
     */setRoutes(routes,skipRender=!1){this.__previousContext=void 0;this.__urlForName=void 0;super.setRoutes(routes);if(!skipRender){this.__onNavigationEvent()}return this.ready}/**
     * Asynchronously resolves the given pathname and renders the resolved route
     * component into the router outlet. If no router outlet is set at the time of
     * calling this method, or at the time when the route resolution is completed,
     * a `TypeError` is thrown.
     *
     * Returns a promise that is fulfilled with the router outlet DOM Node after
     * the route component is created and inserted into the router outlet, or
     * rejected if no route matches the given path.
     *
     * If another render pass is started before the previous one is completed, the
     * result of the previous render pass is ignored.
     *
     * @param {!string|!{pathname: !string, search: ?string, hash: ?string}} pathnameOrContext
     *    the pathname to render or a context object with a `pathname` property,
     *    optional `search` and `hash` properties, and other properties
     *    to pass to the resolver.
     * @param {boolean=} shouldUpdateHistory
     *    update browser history with the rendered location
     * @return {!Promise<!Node>}
     */render(pathnameOrContext,shouldUpdateHistory){const renderId=++this.__lastStartedRenderId,context=Object.assign({search:"",hash:""},isString(pathnameOrContext)?{pathname:pathnameOrContext}:pathnameOrContext,{__renderId:renderId});// Find the first route that resolves to a non-empty result
this.ready=this.resolve(context)// Process the result of this.resolve() and handle all special commands:
// (redirect / prevent / component). If the result is a 'component',
// then go deeper and build the entire chain of nested components matching
// the pathname. Also call all 'on before' callbacks along the way.
.then(context=>this.__fullyResolveChain(context)).then(context=>{if(this.__isLatestRender(context)){const previousContext=this.__previousContext;// Check if the render was prevented and make an early return in that case
if(context===previousContext){// Replace the history with the previous context
// to make sure the URL stays the same.
this.__updateBrowserHistory(previousContext,!0);return this.location}this.location=createLocation(context);if(shouldUpdateHistory){// Replace only if first render redirects, so that we don’t leave
// the redirecting record in the history
this.__updateBrowserHistory(context,1===renderId)}fireRouterEvent("location-changed",{router:this,location:this.location});// Skip detaching/re-attaching there are no render changes
if(context.__skipAttach){this.__copyUnchangedElements(context,previousContext);this.__previousContext=context;return this.location}this.__addAppearingContent(context,previousContext);const animationDone=this.__animateIfNeeded(context);this.__runOnAfterEnterCallbacks(context);this.__runOnAfterLeaveCallbacks(context,previousContext);return animationDone.then(()=>{if(this.__isLatestRender(context)){// If there is another render pass started after this one,
// the 'disappearing content' would be removed when the other
// render pass calls `this.__addAppearingContent()`
this.__removeDisappearingContent();this.__previousContext=context;return this.location}})}}).catch(error=>{if(renderId===this.__lastStartedRenderId){if(shouldUpdateHistory){this.__updateBrowserHistory(context)}removeDomNodes(this.__outlet&&this.__outlet.children);this.location=createLocation(Object.assign(context,{resolver:this}));fireRouterEvent("error",Object.assign({router:this,error},context));throw error}});return this.ready}// `topOfTheChainContextBeforeRedirects` is a context coming from Resolver.resolve().
// It would contain a 'redirect' route or the first 'component' route that
// matched the pathname. There might be more child 'component' routes to be
// resolved and added into the chain. This method would find and add them.
// `contextBeforeRedirects` is the context containing such a child component
// route. It's only necessary when this method is called recursively (otherwise
// it's the same as the 'top of the chain' context).
//
// Apart from building the chain of child components, this method would also
// handle 'redirect' routes, call 'onBefore' callbacks and handle 'prevent'
// and 'redirect' callback results.
__fullyResolveChain(topOfTheChainContextBeforeRedirects,contextBeforeRedirects=topOfTheChainContextBeforeRedirects){return this.__findComponentContextAfterAllRedirects(contextBeforeRedirects)// `contextAfterRedirects` is always a context with an `HTMLElement` result
// In other cases the promise gets rejected and .then() is not called
.then(contextAfterRedirects=>{const redirectsHappened=contextAfterRedirects!==contextBeforeRedirects,topOfTheChainContextAfterRedirects=redirectsHappened?contextAfterRedirects:topOfTheChainContextBeforeRedirects;return contextAfterRedirects.next().then(nextChildContext=>{if(null===nextChildContext||nextChildContext===notFoundResult){const matchedPath=getPathnameForRouter(getMatchedPath(contextAfterRedirects.chain),contextAfterRedirects.resolver);if(matchedPath!==contextAfterRedirects.pathname){throw getNotFoundError(topOfTheChainContextAfterRedirects)}}return nextChildContext&&nextChildContext!==notFoundResult?this.__fullyResolveChain(topOfTheChainContextAfterRedirects,nextChildContext):this.__amendWithOnBeforeCallbacks(contextAfterRedirects)})})}__findComponentContextAfterAllRedirects(context){const result=context.result;if(result instanceof HTMLElement){renderElement(context,result);return Promise.resolve(context)}else if(result.redirect){return this.__redirect(result.redirect,context.__redirectCount,context.__renderId).then(context=>this.__findComponentContextAfterAllRedirects(context))}else if(result instanceof Error){return Promise.reject(result)}else{return Promise.reject(new Error(log(`Invalid route resolution result for path "${context.pathname}". `+`Expected redirect object or HTML element, but got: "${logValue(result)}". `+`Double check the action return value for the route.`)))}}__amendWithOnBeforeCallbacks(contextWithFullChain){return this.__runOnBeforeCallbacks(contextWithFullChain).then(amendedContext=>{if(amendedContext===this.__previousContext||amendedContext===contextWithFullChain){return amendedContext}return this.__fullyResolveChain(amendedContext)})}__runOnBeforeCallbacks(newContext){const previousContext=this.__previousContext||{},previousChain=previousContext.chain||[],newChain=newContext.chain;let callbacks=Promise.resolve();const prevent=()=>({cancel:!0}),redirect=pathname=>createRedirect(newContext,pathname);newContext.__divergedChainIndex=0;newContext.__skipAttach=!1;if(previousChain.length){for(let i=0;i<Math.min(previousChain.length,newChain.length);i=++newContext.__divergedChainIndex){if(previousChain[i].route!==newChain[i].route||previousChain[i].path!==newChain[i].path&&previousChain[i].element!==newChain[i].element||!this.__isReusableElement(previousChain[i].element,newChain[i].element)){break}}// Skip re-attaching and notifications if element and chain do not change
newContext.__skipAttach=// Same route chain
newChain.length===previousChain.length&&newContext.__divergedChainIndex==newChain.length&&// Same element
this.__isReusableElement(newContext.result,previousContext.result);if(newContext.__skipAttach){// execute onBeforeLeave for changed segment element when skipping attach
for(let i=newChain.length-1;0<=i;i--){if(previousChain[i].path!==newChain[i].path||newContext.search!==previousContext.search){callbacks=this.__runOnBeforeLeaveCallbacks(callbacks,newContext,{prevent},previousChain[i])}}// execute onBeforeEnter for changed segment element when skipping attach
for(let i=0;i<newChain.length;i++){if(previousChain[i].path!==newChain[i].path||newContext.search!==previousContext.search){callbacks=this.__runOnBeforeEnterCallbacks(callbacks,newContext,{prevent,redirect},newChain[i])}previousChain[i].element.location=createLocation(newContext,previousChain[i].route)}}else{// execute onBeforeLeave when NOT skipping attach
for(let i=previousChain.length-1;i>=newContext.__divergedChainIndex;i--){callbacks=this.__runOnBeforeLeaveCallbacks(callbacks,newContext,{prevent},previousChain[i])}}}// execute onBeforeEnter when NOT skipping attach
for(let i=newContext.__divergedChainIndex;!newContext.__skipAttach&&i<newChain.length;i++){callbacks=this.__runOnBeforeEnterCallbacks(callbacks,newContext,{prevent,redirect},newChain[i])}return callbacks.then(amendmentResult=>{if(amendmentResult){if(amendmentResult.cancel){this.__previousContext.__renderId=newContext.__renderId;return this.__previousContext}if(amendmentResult.redirect){return this.__redirect(amendmentResult.redirect,newContext.__redirectCount,newContext.__renderId)}}return newContext})}__runOnBeforeLeaveCallbacks(callbacks,newContext,commands,chainElement){const location=createLocation(newContext);return callbacks.then(result=>{if(this.__isLatestRender(newContext)){const afterLeaveFunction=amend("onBeforeLeave",[location,commands,this],chainElement.element);return afterLeaveFunction(result)}}).then(result=>{if(!(result||{}).redirect){return result}})}__runOnBeforeEnterCallbacks(callbacks,newContext,commands,chainElement){const location=createLocation(newContext,chainElement.route);return callbacks.then(result=>{if(this.__isLatestRender(newContext)){const beforeEnterFunction=amend("onBeforeEnter",[location,commands,this],chainElement.element);return beforeEnterFunction(result)}})}__isReusableElement(element,otherElement){if(element&&otherElement){return this.__createdByRouter.get(element)&&this.__createdByRouter.get(otherElement)?element.localName===otherElement.localName:element===otherElement}return!1}__isLatestRender(context){return context.__renderId===this.__lastStartedRenderId}__redirect(redirectData,counter,renderId){if(counter>MAX_REDIRECT_COUNT){throw new Error(log(`Too many redirects when rendering ${redirectData.from}`))}return this.resolve({pathname:this.urlForPath(redirectData.pathname,redirectData.params),redirectFrom:redirectData.from,__redirectCount:(counter||0)+1,__renderId:renderId})}__ensureOutlet(outlet=this.__outlet){if(!(outlet instanceof Node)){throw new TypeError(log(`Expected router outlet to be a valid DOM Node (but got ${outlet})`))}}__updateBrowserHistory({pathname,search="",hash=""},replace){if(window.location.pathname!==pathname||window.location.search!==search||window.location.hash!==hash){const changeState=replace?"replaceState":"pushState";window.history[changeState](null,document.title,pathname+search+hash);window.dispatchEvent(new PopStateEvent("popstate",{state:"vaadin-router-ignore"}))}}__copyUnchangedElements(context,previousContext){// Find the deepest common parent between the last and the new component
// chains. Update references for the unchanged elements in the new chain
let deepestCommonParent=this.__outlet;for(let i=0;i<context.__divergedChainIndex;i++){const unchangedElement=previousContext&&previousContext.chain[i].element;if(unchangedElement){if(unchangedElement.parentNode===deepestCommonParent){context.chain[i].element=unchangedElement;deepestCommonParent=unchangedElement}else{break}}}return deepestCommonParent}__addAppearingContent(context,previousContext){this.__ensureOutlet();// If the previous 'entering' animation has not completed yet,
// stop it and remove that content from the DOM before adding new one.
this.__removeAppearingContent();// Copy reusable elements from the previousContext to current
const deepestCommonParent=this.__copyUnchangedElements(context,previousContext);// Keep two lists of DOM elements:
//  - those that should be removed once the transition animation is over
//  - and those that should remain
this.__appearingContent=[];this.__disappearingContent=Array.from(deepestCommonParent.children).filter(// Only remove layout content that was added by router
e=>this.__addedByRouter.get(e)&&// Do not remove the result element to avoid flickering
e!==context.result);// Add new elements (starting after the deepest common parent) to the DOM.
// That way only the components that are actually different between the two
// locations are added to the DOM (and those that are common remain in the
// DOM without first removing and then adding them again).
let parentElement=deepestCommonParent;for(let i=context.__divergedChainIndex;i<context.chain.length;i++){const elementToAdd=context.chain[i].element;if(elementToAdd){parentElement.appendChild(elementToAdd);this.__addedByRouter.set(elementToAdd,!0);if(parentElement===deepestCommonParent){this.__appearingContent.push(elementToAdd)}parentElement=elementToAdd}}}__removeDisappearingContent(){if(this.__disappearingContent){removeDomNodes(this.__disappearingContent)}this.__disappearingContent=null;this.__appearingContent=null}__removeAppearingContent(){if(this.__disappearingContent&&this.__appearingContent){removeDomNodes(this.__appearingContent);this.__disappearingContent=null;this.__appearingContent=null}}__runOnAfterLeaveCallbacks(currentContext,targetContext){if(!targetContext){return}// REVERSE iteration: from Z to A
for(let i=targetContext.chain.length-1;i>=currentContext.__divergedChainIndex;i--){if(!this.__isLatestRender(currentContext)){break}const currentComponent=targetContext.chain[i].element;if(!currentComponent){continue}try{const location=createLocation(currentContext);runCallbackIfPossible(currentComponent.onAfterLeave,[location,{},targetContext.resolver],currentComponent)}finally{if(-1<this.__disappearingContent.indexOf(currentComponent)){removeDomNodes(currentComponent.children)}}}}__runOnAfterEnterCallbacks(currentContext){// forward iteration: from A to Z
for(let i=currentContext.__divergedChainIndex;i<currentContext.chain.length;i++){if(!this.__isLatestRender(currentContext)){break}const currentComponent=currentContext.chain[i].element||{},location=createLocation(currentContext,currentContext.chain[i].route);runCallbackIfPossible(currentComponent.onAfterEnter,[location,{},currentContext.resolver],currentComponent)}}__animateIfNeeded(context){const from=(this.__disappearingContent||[])[0],to=(this.__appearingContent||[])[0],promises=[],chain=context.chain;let config;for(let i=chain.length;0<i;i--){if(chain[i-1].route.animate){config=chain[i-1].route.animate;break}}if(from&&to&&config){const leave=isObject(config)&&config.leave||"leaving",enter=isObject(config)&&config.enter||"entering";promises.push(animate(from,leave));promises.push(animate(to,enter))}return Promise.all(promises).then(()=>context)}/**
     * Subscribes this instance to navigation events on the `window`.
     *
     * NOTE: beware of resource leaks. For as long as a router instance is
     * subscribed to navigation events, it won't be garbage collected.
     */subscribe(){window.addEventListener("vaadin-router-go",this.__navigationEventHandler)}/**
     * Removes the subscription to navigation events created in the `subscribe()`
     * method.
     */unsubscribe(){window.removeEventListener("vaadin-router-go",this.__navigationEventHandler)}__onNavigationEvent(event){const{pathname,search,hash}=event?event.detail:window.location;if(isString(this.__normalizePathname(pathname))){if(event&&event.preventDefault){event.preventDefault()}this.render({pathname,search,hash},!0)}}/**
     * Configures what triggers Router navigation events:
     *  - `POPSTATE`: popstate events on the current `window`
     *  - `CLICK`: click events on `<a>` links leading to the current page
     *
     * This method is invoked with the pre-configured values when creating a new Router instance.
     * By default, both `POPSTATE` and `CLICK` are enabled. This setup is expected to cover most of the use cases.
     *
     * See the `router-config.js` for the default navigation triggers config. Based on it, you can
     * create the own one and only import the triggers you need, instead of pulling in all the code,
     * e.g. if you want to handle `click` differently.
     *
     * See also **Navigation Triggers** section in [Live Examples](#/classes/Router/demos/demo/index.html).
     *
     * @param {...Router.NavigationTrigger} triggers
     */static setTriggers(...triggers){setNavigationTriggers(triggers)}/**
     * Generates a URL for the route with the given name, optionally performing
     * substitution of parameters.
     *
     * The route is searched in all the Router instances subscribed to
     * navigation events.
     *
     * **Note:** For child route names, only array children are considered.
     * It is not possible to generate URLs using a name for routes set with
     * a children function.
     *
     * @function urlForName
     * @param {!string} name the route name or the route’s `component` name.
     * @param {Router.Params=} params Optional object with route path parameters.
     * Named parameters are passed by name (`params[name] = value`), unnamed
     * parameters are passed by index (`params[index] = value`).
     *
     * @return {string}
     */urlForName(name,params){if(!this.__urlForName){this.__urlForName=generateUrls(this)}return getPathnameForRouter(this.__urlForName(name,params),this)}/**
     * Generates a URL for the given route path, optionally performing
     * substitution of parameters.
     *
     * @param {!string} path string route path declared in [express.js syntax](https://expressjs.com/en/guide/routing.html#route-paths").
     * @param {Router.Params=} params Optional object with route path parameters.
     * Named parameters are passed by name (`params[name] = value`), unnamed
     * parameters are passed by index (`params[index] = value`).
     *
     * @return {string}
     */urlForPath(path,params){return getPathnameForRouter(Router.pathToRegexp.compile(path)(params),this)}/**
     * Triggers navigation to a new path. Returns a boolean without waiting until
     * the navigation is complete. Returns `true` if at least one `Router`
     * has handled the navigation (was subscribed and had `baseUrl` matching
     * the `path` argument), otherwise returns `false`.
     *
     * @param {!string|!{pathname: !string, search: (string|undefined), hash: (string|undefined)}} path
     *   a new in-app path string, or an URL-like object with `pathname`
     *   string property, and optional `search` and `hash` string properties.
     * @return {boolean}
     */static go(path){const{pathname,search,hash}=isString(path)?this.__createUrl(path,"http://a")// some base to omit origin
:path;return fireRouterEvent("go",{pathname,search,hash})}}_exports.Router=Router;const DEV_MODE_CODE_REGEXP=/\/\*\*\s+vaadin-dev-mode:start([\s\S]*)vaadin-dev-mode:end\s+\*\*\//i,FlowClients=window.Vaadin&&window.Vaadin.Flow&&window.Vaadin.Flow.clients;function isMinified(){function test(){/** vaadin-dev-mode:start
    return false;
    vaadin-dev-mode:end **/return!0}return uncommentAndRun(test)}function isDevelopmentMode(){try{if(isForcedDevelopmentMode()){return!0}if(!isLocalhost()){return!1}if(FlowClients){return!isFlowProductionMode()}return!isMinified()}catch(e){// Some error in this code, assume production so no further actions will be taken
return!1}}function isForcedDevelopmentMode(){return localStorage.getItem("vaadin.developmentmode.force")}function isLocalhost(){return 0<=["localhost","127.0.0.1"].indexOf(window.location.hostname)}function isFlowProductionMode(){if(FlowClients){const productionModeApps=Object.keys(FlowClients).map(key=>FlowClients[key]).filter(client=>client.productionMode);if(0<productionModeApps.length){return!0}}return!1}function uncommentAndRun(callback,args){if("function"!==typeof callback){return}const match=DEV_MODE_CODE_REGEXP.exec(callback.toString());if(match){try{// requires CSP: script-src 'unsafe-eval'
callback=new Function(match[1])}catch(e){// eat the exception
console.log("vaadin-development-mode-detector: uncommentAndRun() failed",e)}}return callback(args)}// A guard against polymer-modulizer removing the window.Vaadin
// initialization above.
window.Vaadin=window.Vaadin||{};/**
                                            * Inspects the source code of the given `callback` function for
                                            * specially-marked _commented_ code. If such commented code is found in the
                                            * callback source, uncomments and runs that code instead of the callback
                                            * itself. Otherwise runs the callback as is.
                                            *
                                            * The optional arguments are passed into the callback / uncommented code,
                                            * the result is returned.
                                            *
                                            * See the `isMinified()` function source code in this file for an example.
                                            *
                                            */const runIfDevelopmentMode=function(callback,args){if(window.Vaadin.developmentMode){return uncommentAndRun(callback,args)}};if(window.Vaadin.developmentMode===void 0){window.Vaadin.developmentMode=isDevelopmentMode()}/* This file is autogenerated from src/vaadin-usage-statistics.tpl.html */function maybeGatherAndSendStats(){/** vaadin-dev-mode:start
                                    (function () {
                                    'use strict';
                                    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
                                    return typeof obj;
                                    } : function (obj) {
                                    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                                    };
                                    var classCallCheck = function (instance, Constructor) {
                                    if (!(instance instanceof Constructor)) {
                                      throw new TypeError("Cannot call a class as a function");
                                    }
                                    };
                                    var createClass = function () {
                                    function defineProperties(target, props) {
                                      for (var i = 0; i < props.length; i++) {
                                        var descriptor = props[i];
                                        descriptor.enumerable = descriptor.enumerable || false;
                                        descriptor.configurable = true;
                                        if ("value" in descriptor) descriptor.writable = true;
                                        Object.defineProperty(target, descriptor.key, descriptor);
                                      }
                                    }
                                     return function (Constructor, protoProps, staticProps) {
                                      if (protoProps) defineProperties(Constructor.prototype, protoProps);
                                      if (staticProps) defineProperties(Constructor, staticProps);
                                      return Constructor;
                                    };
                                    }();
                                    var getPolymerVersion = function getPolymerVersion() {
                                    return window.Polymer && window.Polymer.version;
                                    };
                                    var StatisticsGatherer = function () {
                                    function StatisticsGatherer(logger) {
                                      classCallCheck(this, StatisticsGatherer);
                                       this.now = new Date().getTime();
                                      this.logger = logger;
                                    }
                                     createClass(StatisticsGatherer, [{
                                      key: 'frameworkVersionDetectors',
                                      value: function frameworkVersionDetectors() {
                                        return {
                                          'Flow': function Flow() {
                                            if (window.Vaadin && window.Vaadin.Flow && window.Vaadin.Flow.clients) {
                                              var flowVersions = Object.keys(window.Vaadin.Flow.clients).map(function (key) {
                                                return window.Vaadin.Flow.clients[key];
                                              }).filter(function (client) {
                                                return client.getVersionInfo;
                                              }).map(function (client) {
                                                return client.getVersionInfo().flow;
                                              });
                                              if (flowVersions.length > 0) {
                                                return flowVersions[0];
                                              }
                                            }
                                          },
                                          'Vaadin Framework': function VaadinFramework() {
                                            if (window.vaadin && window.vaadin.clients) {
                                              var frameworkVersions = Object.values(window.vaadin.clients).filter(function (client) {
                                                return client.getVersionInfo;
                                              }).map(function (client) {
                                                return client.getVersionInfo().vaadinVersion;
                                              });
                                              if (frameworkVersions.length > 0) {
                                                return frameworkVersions[0];
                                              }
                                            }
                                          },
                                          'AngularJs': function AngularJs() {
                                            if (window.angular && window.angular.version && window.angular.version) {
                                              return window.angular.version.full;
                                            }
                                          },
                                          'Angular': function Angular() {
                                            if (window.ng) {
                                              var tags = document.querySelectorAll("[ng-version]");
                                              if (tags.length > 0) {
                                                return tags[0].getAttribute("ng-version");
                                              }
                                              return "Unknown";
                                            }
                                          },
                                          'Backbone.js': function BackboneJs() {
                                            if (window.Backbone) {
                                              return window.Backbone.VERSION;
                                            }
                                          },
                                          'React': function React() {
                                            var reactSelector = '[data-reactroot], [data-reactid]';
                                            if (!!document.querySelector(reactSelector)) {
                                              // React does not publish the version by default
                                              return "unknown";
                                            }
                                          },
                                          'Ember': function Ember() {
                                            if (window.Em && window.Em.VERSION) {
                                              return window.Em.VERSION;
                                            } else if (window.Ember && window.Ember.VERSION) {
                                              return window.Ember.VERSION;
                                            }
                                          },
                                          'jQuery': function (_jQuery) {
                                            function jQuery() {
                                              return _jQuery.apply(this, arguments);
                                            }
                                             jQuery.toString = function () {
                                              return _jQuery.toString();
                                            };
                                             return jQuery;
                                          }(function () {
                                            if (typeof jQuery === 'function' && jQuery.prototype.jquery !== undefined) {
                                              return jQuery.prototype.jquery;
                                            }
                                          }),
                                          'Polymer': function Polymer() {
                                            var version = getPolymerVersion();
                                            if (version) {
                                              return version;
                                            }
                                          },
                                          'LitElement': function LitElement() {
                                            var version = window.litElementVersions && window.litElementVersions[0];
                                            if (version) {
                                              return version;
                                            }
                                          },
                                          'LitHtml': function LitHtml() {
                                            var version = window.litHtmlVersions && window.litHtmlVersions[0];
                                            if (version) {
                                              return version;
                                            }
                                          },
                                          'Vue.js': function VueJs() {
                                            if (window.Vue) {
                                              return window.Vue.version;
                                            }
                                          }
                                        };
                                      }
                                    }, {
                                      key: 'getUsedVaadinElements',
                                      value: function getUsedVaadinElements(elements) {
                                        var version = getPolymerVersion();
                                        var elementClasses = void 0;
                                        if (version && version.indexOf('2') === 0) {
                                          // Polymer 2: components classes are stored in window.Vaadin
                                          elementClasses = Object.keys(window.Vaadin).map(function (c) {
                                            return window.Vaadin[c];
                                          }).filter(function (c) {
                                            return c.is;
                                          });
                                        } else {
                                          // Polymer 3: components classes are stored in window.Vaadin.registrations
                                          elementClasses = window.Vaadin.registrations || [];
                                        }
                                        elementClasses.forEach(function (klass) {
                                          var version = klass.version ? klass.version : "0.0.0";
                                          elements[klass.is] = { version: version };
                                        });
                                      }
                                    }, {
                                      key: 'getUsedVaadinThemes',
                                      value: function getUsedVaadinThemes(themes) {
                                        ['Lumo', 'Material'].forEach(function (themeName) {
                                          var theme;
                                          var version = getPolymerVersion();
                                          if (version && version.indexOf('2') === 0) {
                                            // Polymer 2: themes are stored in window.Vaadin
                                            theme = window.Vaadin[themeName];
                                          } else {
                                            // Polymer 3: themes are stored in custom element registry
                                            theme = customElements.get('vaadin-' + themeName.toLowerCase() + '-styles');
                                          }
                                          if (theme && theme.version) {
                                            themes[themeName] = { version: theme.version };
                                          }
                                        });
                                      }
                                    }, {
                                      key: 'getFrameworks',
                                      value: function getFrameworks(frameworks) {
                                        var detectors = this.frameworkVersionDetectors();
                                        Object.keys(detectors).forEach(function (framework) {
                                          var detector = detectors[framework];
                                          try {
                                            var version = detector();
                                            if (version) {
                                              frameworks[framework] = { version: version };
                                            }
                                          } catch (e) {}
                                        });
                                      }
                                    }, {
                                      key: 'gather',
                                      value: function gather(storage) {
                                        var storedStats = storage.read();
                                        var gatheredStats = {};
                                        var types = ["elements", "frameworks", "themes"];
                                         types.forEach(function (type) {
                                          gatheredStats[type] = {};
                                          if (!storedStats[type]) {
                                            storedStats[type] = {};
                                          }
                                        });
                                         var previousStats = JSON.stringify(storedStats);
                                         this.getUsedVaadinElements(gatheredStats.elements);
                                        this.getFrameworks(gatheredStats.frameworks);
                                        this.getUsedVaadinThemes(gatheredStats.themes);
                                         var now = this.now;
                                        types.forEach(function (type) {
                                          var keys = Object.keys(gatheredStats[type]);
                                          keys.forEach(function (key) {
                                            if (!storedStats[type][key] || _typeof(storedStats[type][key]) != _typeof({})) {
                                              storedStats[type][key] = { firstUsed: now };
                                            }
                                            // Discards any previously logged version number
                                            storedStats[type][key].version = gatheredStats[type][key].version;
                                            storedStats[type][key].lastUsed = now;
                                          });
                                        });
                                         var newStats = JSON.stringify(storedStats);
                                        storage.write(newStats);
                                        if (newStats != previousStats && Object.keys(storedStats).length > 0) {
                                          this.logger.debug("New stats: " + newStats);
                                        }
                                      }
                                    }]);
                                    return StatisticsGatherer;
                                    }();
                                    var StatisticsStorage = function () {
                                    function StatisticsStorage(key) {
                                      classCallCheck(this, StatisticsStorage);
                                       this.key = key;
                                    }
                                     createClass(StatisticsStorage, [{
                                      key: 'read',
                                      value: function read() {
                                        var localStorageStatsString = localStorage.getItem(this.key);
                                        try {
                                          return JSON.parse(localStorageStatsString ? localStorageStatsString : '{}');
                                        } catch (e) {
                                          return {};
                                        }
                                      }
                                    }, {
                                      key: 'write',
                                      value: function write(data) {
                                        localStorage.setItem(this.key, data);
                                      }
                                    }, {
                                      key: 'clear',
                                      value: function clear() {
                                        localStorage.removeItem(this.key);
                                      }
                                    }, {
                                      key: 'isEmpty',
                                      value: function isEmpty() {
                                        var storedStats = this.read();
                                        var empty = true;
                                        Object.keys(storedStats).forEach(function (key) {
                                          if (Object.keys(storedStats[key]).length > 0) {
                                            empty = false;
                                          }
                                        });
                                         return empty;
                                      }
                                    }]);
                                    return StatisticsStorage;
                                    }();
                                    var StatisticsSender = function () {
                                    function StatisticsSender(url, logger) {
                                      classCallCheck(this, StatisticsSender);
                                       this.url = url;
                                      this.logger = logger;
                                    }
                                     createClass(StatisticsSender, [{
                                      key: 'send',
                                      value: function send(data, errorHandler) {
                                        var logger = this.logger;
                                         if (navigator.onLine === false) {
                                          logger.debug("Offline, can't send");
                                          errorHandler();
                                          return;
                                        }
                                        logger.debug("Sending data to " + this.url);
                                         var req = new XMLHttpRequest();
                                        req.withCredentials = true;
                                        req.addEventListener("load", function () {
                                          // Stats sent, nothing more to do
                                          logger.debug("Response: " + req.responseText);
                                        });
                                        req.addEventListener("error", function () {
                                          logger.debug("Send failed");
                                          errorHandler();
                                        });
                                        req.addEventListener("abort", function () {
                                          logger.debug("Send aborted");
                                          errorHandler();
                                        });
                                        req.open("POST", this.url);
                                        req.setRequestHeader("Content-Type", "application/json");
                                        req.send(data);
                                      }
                                    }]);
                                    return StatisticsSender;
                                    }();
                                    var StatisticsLogger = function () {
                                    function StatisticsLogger(id) {
                                      classCallCheck(this, StatisticsLogger);
                                       this.id = id;
                                    }
                                     createClass(StatisticsLogger, [{
                                      key: '_isDebug',
                                      value: function _isDebug() {
                                        return localStorage.getItem("vaadin." + this.id + ".debug");
                                      }
                                    }, {
                                      key: 'debug',
                                      value: function debug(msg) {
                                        if (this._isDebug()) {
                                          console.info(this.id + ": " + msg);
                                        }
                                      }
                                    }]);
                                    return StatisticsLogger;
                                    }();
                                    var UsageStatistics = function () {
                                    function UsageStatistics() {
                                      classCallCheck(this, UsageStatistics);
                                       this.now = new Date();
                                      this.timeNow = this.now.getTime();
                                      this.gatherDelay = 10; // Delay between loading this file and gathering stats
                                      this.initialDelay = 24 * 60 * 60;
                                       this.logger = new StatisticsLogger("statistics");
                                      this.storage = new StatisticsStorage("vaadin.statistics.basket");
                                      this.gatherer = new StatisticsGatherer(this.logger);
                                      this.sender = new StatisticsSender("https://tools.vaadin.com/usage-stats/submit", this.logger);
                                    }
                                     createClass(UsageStatistics, [{
                                      key: 'maybeGatherAndSend',
                                      value: function maybeGatherAndSend() {
                                        var _this = this;
                                         if (localStorage.getItem(UsageStatistics.optOutKey)) {
                                          return;
                                        }
                                        this.gatherer.gather(this.storage);
                                        setTimeout(function () {
                                          _this.maybeSend();
                                        }, this.gatherDelay * 1000);
                                      }
                                    }, {
                                      key: 'lottery',
                                      value: function lottery() {
                                        return Math.random() <= 0.05;
                                      }
                                    }, {
                                      key: 'currentMonth',
                                      value: function currentMonth() {
                                        return this.now.getYear() * 12 + this.now.getMonth();
                                      }
                                    }, {
                                      key: 'maybeSend',
                                      value: function maybeSend() {
                                        var firstUse = Number(localStorage.getItem(UsageStatistics.firstUseKey));
                                        var monthProcessed = Number(localStorage.getItem(UsageStatistics.monthProcessedKey));
                                         if (!firstUse) {
                                          // Use a grace period to avoid interfering with tests, incognito mode etc
                                          firstUse = this.timeNow;
                                          localStorage.setItem(UsageStatistics.firstUseKey, firstUse);
                                        }
                                         if (this.timeNow < firstUse + this.initialDelay * 1000) {
                                          this.logger.debug("No statistics will be sent until the initial delay of " + this.initialDelay + "s has passed");
                                          return;
                                        }
                                        if (this.currentMonth() <= monthProcessed) {
                                          this.logger.debug("This month has already been processed");
                                          return;
                                        }
                                        localStorage.setItem(UsageStatistics.monthProcessedKey, this.currentMonth());
                                        // Use random sampling
                                        if (this.lottery()) {
                                          this.logger.debug("Congratulations, we have a winner!");
                                        } else {
                                          this.logger.debug("Sorry, no stats from you this time");
                                          return;
                                        }
                                         this.send();
                                      }
                                    }, {
                                      key: 'send',
                                      value: function send() {
                                        // Ensure we have the latest data
                                        this.gatherer.gather(this.storage);
                                         // Read, send and clean up
                                        var data = this.storage.read();
                                        data["firstUse"] = Number(localStorage.getItem(UsageStatistics.firstUseKey));
                                        data["usageStatisticsVersion"] = UsageStatistics.version;
                                        var info = 'This request contains usage statistics gathered from the application running in development mode. \n\nStatistics gathering is automatically disabled and excluded from production builds.\n\nFor details and to opt-out, see https://github.com/vaadin/vaadin-usage-statistics.\n\n\n\n';
                                        var self = this;
                                        this.sender.send(info + JSON.stringify(data), function () {
                                          // Revert the 'month processed' flag
                                          localStorage.setItem(UsageStatistics.monthProcessedKey, self.currentMonth() - 1);
                                        });
                                      }
                                    }], [{
                                      key: 'version',
                                      get: function get$1() {
                                        return '2.0.10';
                                      }
                                    }, {
                                      key: 'firstUseKey',
                                      get: function get$1() {
                                        return 'vaadin.statistics.firstuse';
                                      }
                                    }, {
                                      key: 'monthProcessedKey',
                                      get: function get$1() {
                                        return 'vaadin.statistics.monthProcessed';
                                      }
                                    }, {
                                      key: 'optOutKey',
                                      get: function get$1() {
                                        return 'vaadin.statistics.optout';
                                      }
                                    }]);
                                    return UsageStatistics;
                                    }();
                                    try {
                                    window.Vaadin = window.Vaadin || {};
                                    window.Vaadin.usageStatsChecker = window.Vaadin.usageStatsChecker || new UsageStatistics();
                                    window.Vaadin.usageStatsChecker.maybeGatherAndSend();
                                    } catch (e) {
                                    // Intentionally ignored as this is not a problem in the app being developed
                                    }
                                    }());
                                     vaadin-dev-mode:end **/}const usageStatistics=function(){if("function"===typeof runIfDevelopmentMode){return runIfDevelopmentMode(maybeGatherAndSendStats)}};window.Vaadin=window.Vaadin||{};window.Vaadin.registrations=window.Vaadin.registrations||[];window.Vaadin.registrations.push({is:"@vaadin/router",version:"1.5.2"});usageStatistics();Router.NavigationTrigger={POPSTATE,CLICK};var vaadinRouter={Resolver:Resolver,Router:Router};/**
   @license
   Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
   This code may only be used under the BSD style license found at
   http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
   http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
   found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
   part of the polymer project is also subject to an additional IP rights grant
   found at http://polymer.github.io/PATENTS.txt
   */_exports.$vaadinRouter=vaadinRouter;const supportsAdoptingStyleSheets="adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype;_exports.supportsAdoptingStyleSheets$1=_exports.supportsAdoptingStyleSheets=supportsAdoptingStyleSheets;const constructionToken=Symbol();class CSSResult{constructor(cssText,safeToken){if(safeToken!==constructionToken){throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.")}this.cssText=cssText}// Note, this is a getter so that it's lazy. In practice, this means
// stylesheets are not created until the first element instance is made.
get styleSheet(){if(this._styleSheet===void 0){// Note, if `adoptedStyleSheets` is supported then we assume CSSStyleSheet
// is constructable.
if(supportsAdoptingStyleSheets){this._styleSheet=new CSSStyleSheet;this._styleSheet.replaceSync(this.cssText)}else{this._styleSheet=null}}return this._styleSheet}toString(){return this.cssText}}/**
   * Wrap a value for interpolation in a css tagged template literal.
   *
   * This is unsafe because untrusted CSS text can be used to phone home
   * or exfiltrate data to an attacker controlled site. Take care to only use
   * this with trusted input.
   */_exports.CSSResult$1=_exports.CSSResult=CSSResult;const unsafeCSS=value=>{return new CSSResult(value+"",constructionToken)};_exports.unsafeCSS$1=_exports.unsafeCSS=unsafeCSS;const textFromCSSResult=value=>{if(value instanceof CSSResult){return value.cssText}else if("number"===typeof value){return value}else{throw new Error(`Value passed to 'css' function must be a 'css' function result: ${value}. Use 'unsafeCSS' to pass non-literal values, but
            take care to ensure page security.`)}},css=(strings,...values)=>{const cssText=values.reduce((acc,v,idx)=>acc+textFromCSSResult(v)+strings[idx+1],strings[0]);return new CSSResult(cssText,constructionToken)};/**
    * Template tag which which can be used with LitElement's `style` property to
    * set element styles. For security reasons, only literal string values may be
    * used. To incorporate non-literal values `unsafeCSS` may be used inside a
    * template string part.
    */_exports.css$1=_exports.css=css;var cssTag={supportsAdoptingStyleSheets:supportsAdoptingStyleSheets,CSSResult:CSSResult,unsafeCSS:unsafeCSS,css:css};/**
    * @license
    * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
    * This code may only be used under the BSD style license found at
    * http://polymer.github.io/LICENSE.txt
    * The complete set of authors may be found at
    * http://polymer.github.io/AUTHORS.txt
    * The complete set of contributors may be found at
    * http://polymer.github.io/CONTRIBUTORS.txt
    * Code distributed by Google as part of the polymer project is also
    * subject to an additional IP rights grant found at
    * http://polymer.github.io/PATENTS.txt
    */_exports.$cssTag=cssTag;const legacyCustomElement=(tagName,clazz)=>{window.customElements.define(tagName,clazz);// Cast as any because TS doesn't recognize the return type as being a
// subtype of the decorated class when clazz is typed as
// `Constructor<HTMLElement>` for some reason.
// `Constructor<HTMLElement>` is helpful to make sure the decorator is
// applied to elements however.
// tslint:disable-next-line:no-any
return clazz},standardCustomElement=(tagName,descriptor)=>{const{kind,elements}=descriptor;return{kind,elements,// This callback is called once the class is otherwise fully defined
finisher(clazz){window.customElements.define(tagName,clazz)}}},customElement=tagName=>classOrDescriptor=>"function"===typeof classOrDescriptor?legacyCustomElement(tagName,classOrDescriptor):standardCustomElement(tagName,classOrDescriptor);_exports.customElement$1=_exports.customElement=customElement;const standardProperty=(options,element)=>{// When decorating an accessor, pass it through and add property metadata.
// Note, the `hasOwnProperty` check in `createProperty` ensures we don't
// stomp over the user's accessor.
if("method"===element.kind&&element.descriptor&&!("value"in element.descriptor)){return Object.assign({},element,{finisher(clazz){clazz.createProperty(element.key,options)}})}else{// createProperty() takes care of defining the property, but we still
// must return some kind of descriptor, so return a descriptor for an
// unused prototype field. The finisher calls createProperty().
return{kind:"field",key:Symbol(),placement:"own",descriptor:{},// When @babel/plugin-proposal-decorators implements initializers,
// do this instead of the initializer below. See:
// https://github.com/babel/babel/issues/9260 extras: [
//   {
//     kind: 'initializer',
//     placement: 'own',
//     initializer: descriptor.initializer,
//   }
// ],
initializer(){if("function"===typeof element.initializer){this[element.key]=element.initializer.call(this)}},finisher(clazz){clazz.createProperty(element.key,options)}}}},legacyProperty=(options,proto,name)=>{proto.constructor.createProperty(name,options)};/**
    * A property decorator which creates a LitElement property which reflects a
    * corresponding attribute value. A `PropertyDeclaration` may optionally be
    * supplied to configure property features.
    *
    * @ExportDecoratedItems
    */function property(options){// tslint:disable-next-line:no-any decorator
return(protoOrDescriptor,name)=>name!==void 0?legacyProperty(options,protoOrDescriptor,name):standardProperty(options,protoOrDescriptor)}/**
   * A property decorator that converts a class property into a getter that
   * executes a querySelector on the element's renderRoot.
   *
   * @ExportDecoratedItems
   */function query(selector){return(protoOrDescriptor,// tslint:disable-next-line:no-any decorator
name)=>{const descriptor={get(){return this.renderRoot.querySelector(selector)},enumerable:!0,configurable:!0};return name!==void 0?legacyQuery(descriptor,protoOrDescriptor,name):standardQuery(descriptor,protoOrDescriptor)}}/**
   * A property decorator that converts a class property into a getter
   * that executes a querySelectorAll on the element's renderRoot.
   *
   * @ExportDecoratedItems
   */function queryAll(selector){return(protoOrDescriptor,// tslint:disable-next-line:no-any decorator
name)=>{const descriptor={get(){return this.renderRoot.querySelectorAll(selector)},enumerable:!0,configurable:!0};return name!==void 0?legacyQuery(descriptor,protoOrDescriptor,name):standardQuery(descriptor,protoOrDescriptor)}}const legacyQuery=(descriptor,proto,name)=>{Object.defineProperty(proto,name,descriptor)},standardQuery=(descriptor,element)=>({kind:"method",placement:"prototype",key:element.key,descriptor}),standardEventOptions=(options,element)=>{return Object.assign({},element,{finisher(clazz){Object.assign(clazz.prototype[element.key],options)}})},legacyEventOptions=// tslint:disable-next-line:no-any legacy decorator
(options,proto,name)=>{Object.assign(proto[name],options)},eventOptions=options=>// Return value typed as any to prevent TypeScript from complaining that
// standard decorator function signature does not match TypeScript decorator
// signature
// TODO(kschaaf): unclear why it was only failing on this decorator and not
// the others
(protoOrDescriptor,name)=>name!==void 0?legacyEventOptions(options,protoOrDescriptor,name):standardEventOptions(options,protoOrDescriptor);_exports.eventOptions$1=_exports.eventOptions=eventOptions;var decorators={customElement:customElement,property:property,query:query,queryAll:queryAll,eventOptions:eventOptions};/**
    * @license
    * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
    * This code may only be used under the BSD style license found at
    * http://polymer.github.io/LICENSE.txt
    * The complete set of authors may be found at
    * http://polymer.github.io/AUTHORS.txt
    * The complete set of contributors may be found at
    * http://polymer.github.io/CONTRIBUTORS.txt
    * Code distributed by Google as part of the polymer project is also
    * subject to an additional IP rights grant found at
    * http://polymer.github.io/PATENTS.txt
    */_exports.$decorators=decorators;var _a;/**
         * When using Closure Compiler, JSCompiler_renameProperty(property, object) is
         * replaced at compile time by the munged name for object[property]. We cannot
         * alias this function, so we have to use a small shim that has the same
         * behavior when not compiling.
         */window.JSCompiler_renameProperty=(prop,_obj)=>prop;const defaultConverter={toAttribute(value,type){switch(type){case Boolean:return value?"":null;case Object:case Array:// if the value is `null` or `undefined` pass this through
// to allow removing/no change behavior.
return null==value?value:JSON.stringify(value);}return value},fromAttribute(value,type){switch(type){case Boolean:return null!==value;case Number:return null===value?null:+value;case Object:case Array:return JSON.parse(value);}return value}};/**
    * Change function that returns true if `value` is different from `oldValue`.
    * This method is used as the default for a property's `hasChanged` function.
    */_exports.defaultConverter$1=_exports.defaultConverter=defaultConverter;const notEqual=(value,old)=>{// This ensures (old==NaN, value==NaN) always returns false
return old!==value&&(old===old||value===value)};_exports.notEqual$1=_exports.notEqual=notEqual;const defaultPropertyDeclaration={attribute:!0,type:String,converter:defaultConverter,reflect:!1,hasChanged:notEqual},microtaskPromise=Promise.resolve(!0),STATE_HAS_UPDATED=1,STATE_UPDATE_REQUESTED=1<<2,STATE_IS_REFLECTING_TO_ATTRIBUTE=1<<3,STATE_IS_REFLECTING_TO_PROPERTY=1<<4,STATE_HAS_CONNECTED=1<<5,finalized="finalized";/**
                                * Base element class which manages element properties and attributes. When
                                * properties change, the `update` method is asynchronously called. This method
                                * should be supplied by subclassers to render updates as desired.
                                */class UpdatingElement extends HTMLElement{constructor(){super();this._updateState=0;this._instanceProperties=void 0;this._updatePromise=microtaskPromise;this._hasConnectedResolver=void 0;/**
                                             * Map with keys for any properties that have changed since the last
                                             * update cycle with previous values.
                                             */this._changedProperties=new Map;/**
                                          * Map with keys of properties that should be reflected when updated.
                                          */this._reflectingProperties=void 0;this.initialize()}/**
     * Returns a list of attributes corresponding to the registered properties.
     * @nocollapse
     */static get observedAttributes(){// note: piggy backing on this to ensure we're finalized.
this.finalize();const attributes=[];// Use forEach so this works even if for/of loops are compiled to for loops
// expecting arrays
this._classProperties.forEach((v,p)=>{const attr=this._attributeNameForProperty(p,v);if(attr!==void 0){this._attributeToPropertyMap.set(attr,p);attributes.push(attr)}});return attributes}/**
     * Ensures the private `_classProperties` property metadata is created.
     * In addition to `finalize` this is also called in `createProperty` to
     * ensure the `@property` decorator can add property metadata.
     */ /** @nocollapse */static _ensureClassProperties(){// ensure private storage for property declarations.
if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;// NOTE: Workaround IE11 not supporting Map constructor argument.
const superProperties=Object.getPrototypeOf(this)._classProperties;if(superProperties!==void 0){superProperties.forEach((v,k)=>this._classProperties.set(k,v))}}}/**
     * Creates a property accessor on the element prototype if one does not exist.
     * The property setter calls the property's `hasChanged` property option
     * or uses a strict identity check to determine whether or not to request
     * an update.
     * @nocollapse
     */static createProperty(name,options=defaultPropertyDeclaration){// Note, since this can be called by the `@property` decorator which
// is called before `finalize`, we ensure storage exists for property
// metadata.
this._ensureClassProperties();this._classProperties.set(name,options);// Do not generate an accessor if the prototype already has one, since
// it would be lost otherwise and that would never be the user's intention;
// Instead, we expect users to call `requestUpdate` themselves from
// user-defined accessors. Note that if the super has an accessor we will
// still overwrite it
if(options.noAccessor||this.prototype.hasOwnProperty(name)){return}const key="symbol"===typeof name?Symbol():`__${name}`;Object.defineProperty(this.prototype,name,{// tslint:disable-next-line:no-any no symbol in index
get(){return this[key]},set(value){const oldValue=this[name];this[key]=value;this._requestUpdate(name,oldValue)},configurable:!0,enumerable:!0})}/**
     * Creates property accessors for registered properties and ensures
     * any superclasses are also finalized.
     * @nocollapse
     */static finalize(){// finalize any superclasses
const superCtor=Object.getPrototypeOf(this);if(!superCtor.hasOwnProperty(finalized)){superCtor.finalize()}this[finalized]=!0;this._ensureClassProperties();// initialize Map populated in observedAttributes
this._attributeToPropertyMap=new Map;// make any properties
// Note, only process "own" properties since this element will inherit
// any properties defined on the superClass, and finalization ensures
// the entire prototype chain is finalized.
if(this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const props=this.properties,propKeys=[...Object.getOwnPropertyNames(props),...("function"===typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(props):[])];// support symbols in properties (IE11 does not support this)
// This for/of is ok because propKeys is an array
for(const p of propKeys){// note, use of `any` is due to TypeSript lack of support for symbol in
// index types
// tslint:disable-next-line:no-any no symbol in index
this.createProperty(p,props[p])}}}/**
     * Returns the property name for the given attribute `name`.
     * @nocollapse
     */static _attributeNameForProperty(name,options){const attribute=options.attribute;return!1===attribute?void 0:"string"===typeof attribute?attribute:"string"===typeof name?name.toLowerCase():void 0}/**
     * Returns true if a property should request an update.
     * Called when a property value is set and uses the `hasChanged`
     * option for the property if present or a strict identity check.
     * @nocollapse
     */static _valueHasChanged(value,old,hasChanged=notEqual){return hasChanged(value,old)}/**
     * Returns the property value for the given attribute value.
     * Called via the `attributeChangedCallback` and uses the property's
     * `converter` or `converter.fromAttribute` property option.
     * @nocollapse
     */static _propertyValueFromAttribute(value,options){const type=options.type,converter=options.converter||defaultConverter,fromAttribute="function"===typeof converter?converter:converter.fromAttribute;return fromAttribute?fromAttribute(value,type):value}/**
     * Returns the attribute value for the given property value. If this
     * returns undefined, the property will *not* be reflected to an attribute.
     * If this returns null, the attribute will be removed, otherwise the
     * attribute will be set to the value.
     * This uses the property's `reflect` and `type.toAttribute` property options.
     * @nocollapse
     */static _propertyValueToAttribute(value,options){if(options.reflect===void 0){return}const type=options.type,converter=options.converter,toAttribute=converter&&converter.toAttribute||defaultConverter.toAttribute;return toAttribute(value,type)}/**
     * Performs element initialization. By default captures any pre-set values for
     * registered properties.
     */initialize(){this._saveInstanceProperties();// ensures first update will be caught by an early access of
// `updateComplete`
this._requestUpdate()}/**
     * Fixes any properties set on the instance before upgrade time.
     * Otherwise these would shadow the accessor and break these properties.
     * The properties are stored in a Map which is played back after the
     * constructor runs. Note, on very old versions of Safari (<=9) or Chrome
     * (<=41), properties created for native platform properties like (`id` or
     * `name`) may not have default values set in the element constructor. On
     * these browsers native properties appear on instances and therefore their
     * default value will overwrite any element default (e.g. if the element sets
     * this.id = 'id' in the constructor, the 'id' will become '' since this is
     * the native platform default).
     */_saveInstanceProperties(){// Use forEach so this works even if for/of loops are compiled to for loops
// expecting arrays
this.constructor._classProperties.forEach((_v,p)=>{if(this.hasOwnProperty(p)){const value=this[p];delete this[p];if(!this._instanceProperties){this._instanceProperties=new Map}this._instanceProperties.set(p,value)}})}/**
     * Applies previously saved instance properties.
     */_applyInstanceProperties(){// Use forEach so this works even if for/of loops are compiled to for loops
// expecting arrays
// tslint:disable-next-line:no-any
this._instanceProperties.forEach((v,p)=>this[p]=v);this._instanceProperties=void 0}connectedCallback(){this._updateState=this._updateState|STATE_HAS_CONNECTED;// Ensure first connection completes an update. Updates cannot complete
// before connection and if one is pending connection the
// `_hasConnectionResolver` will exist. If so, resolve it to complete the
// update, otherwise requestUpdate.
if(this._hasConnectedResolver){this._hasConnectedResolver();this._hasConnectedResolver=void 0}}/**
     * Allows for `super.disconnectedCallback()` in extensions while
     * reserving the possibility of making non-breaking feature additions
     * when disconnecting at some point in the future.
     */disconnectedCallback(){}/**
                             * Synchronizes property values when attributes change.
                             */attributeChangedCallback(name,old,value){if(old!==value){this._attributeToProperty(name,value)}}_propertyToAttribute(name,value,options=defaultPropertyDeclaration){const ctor=this.constructor,attr=ctor._attributeNameForProperty(name,options);if(attr!==void 0){const attrValue=ctor._propertyValueToAttribute(value,options);// an undefined value does not change the attribute.
if(attrValue===void 0){return}// Track if the property is being reflected to avoid
// setting the property again via `attributeChangedCallback`. Note:
// 1. this takes advantage of the fact that the callback is synchronous.
// 2. will behave incorrectly if multiple attributes are in the reaction
// stack at time of calling. However, since we process attributes
// in `update` this should not be possible (or an extreme corner case
// that we'd like to discover).
// mark state reflecting
this._updateState=this._updateState|STATE_IS_REFLECTING_TO_ATTRIBUTE;if(null==attrValue){this.removeAttribute(attr)}else{this.setAttribute(attr,attrValue)}// mark state not reflecting
this._updateState=this._updateState&~STATE_IS_REFLECTING_TO_ATTRIBUTE}}_attributeToProperty(name,value){// Use tracking info to avoid deserializing attribute value if it was
// just set from a property setter.
if(this._updateState&STATE_IS_REFLECTING_TO_ATTRIBUTE){return}const ctor=this.constructor,propName=ctor._attributeToPropertyMap.get(name);if(propName!==void 0){const options=ctor._classProperties.get(propName)||defaultPropertyDeclaration;// mark state reflecting
this._updateState=this._updateState|STATE_IS_REFLECTING_TO_PROPERTY;this[propName]=// tslint:disable-next-line:no-any
ctor._propertyValueFromAttribute(value,options);// mark state not reflecting
this._updateState=this._updateState&~STATE_IS_REFLECTING_TO_PROPERTY}}/**
     * This private version of `requestUpdate` does not access or return the
     * `updateComplete` promise. This promise can be overridden and is therefore
     * not free to access.
     */_requestUpdate(name,oldValue){let shouldRequestUpdate=!0;// If we have a property key, perform property update steps.
if(name!==void 0){const ctor=this.constructor,options=ctor._classProperties.get(name)||defaultPropertyDeclaration;if(ctor._valueHasChanged(this[name],oldValue,options.hasChanged)){if(!this._changedProperties.has(name)){this._changedProperties.set(name,oldValue)}// Add to reflecting properties set.
// Note, it's important that every change has a chance to add the
// property to `_reflectingProperties`. This ensures setting
// attribute + property reflects correctly.
if(!0===options.reflect&&!(this._updateState&STATE_IS_REFLECTING_TO_PROPERTY)){if(this._reflectingProperties===void 0){this._reflectingProperties=new Map}this._reflectingProperties.set(name,options)}}else{// Abort the request if the property should not be considered changed.
shouldRequestUpdate=!1}}if(!this._hasRequestedUpdate&&shouldRequestUpdate){this._enqueueUpdate()}}/**
     * Requests an update which is processed asynchronously. This should
     * be called when an element should update based on some state not triggered
     * by setting a property. In this case, pass no arguments. It should also be
     * called when manually implementing a property setter. In this case, pass the
     * property `name` and `oldValue` to ensure that any configured property
     * options are honored. Returns the `updateComplete` Promise which is resolved
     * when the update completes.
     *
     * @param name {PropertyKey} (optional) name of requesting property
     * @param oldValue {any} (optional) old value of requesting property
     * @returns {Promise} A Promise that is resolved when the update completes.
     */requestUpdate(name,oldValue){this._requestUpdate(name,oldValue);return this.updateComplete}/**
     * Sets up the element to asynchronously update.
     */_enqueueUpdate(){var _this=this;return babelHelpers.asyncToGenerator(function*(){// Mark state updating...
_this._updateState=_this._updateState|STATE_UPDATE_REQUESTED;let resolve,reject;const previousUpdatePromise=_this._updatePromise;_this._updatePromise=new Promise((res,rej)=>{resolve=res;reject=rej});try{// Ensure any previous update has resolved before updating.
// This `await` also ensures that property changes are batched.
yield previousUpdatePromise}catch(e){}// Ignore any previous errors. We only care that the previous cycle is
// done. Any error should have been handled in the previous update.
// Make sure the element has connected before updating.
if(!_this._hasConnected){yield new Promise(res=>_this._hasConnectedResolver=res)}try{const result=_this.performUpdate();// If `performUpdate` returns a Promise, we await it. This is done to
// enable coordinating updates with a scheduler. Note, the result is
// checked to avoid delaying an additional microtask unless we need to.
if(null!=result){yield result}}catch(e){reject(e)}resolve(!_this._hasRequestedUpdate)})()}get _hasConnected(){return this._updateState&STATE_HAS_CONNECTED}get _hasRequestedUpdate(){return this._updateState&STATE_UPDATE_REQUESTED}get hasUpdated(){return this._updateState&STATE_HAS_UPDATED}/**
     * Performs an element update. Note, if an exception is thrown during the
     * update, `firstUpdated` and `updated` will not be called.
     *
     * You can override this method to change the timing of updates. If this
     * method is overridden, `super.performUpdate()` must be called.
     *
     * For instance, to schedule updates to occur just before the next frame:
     *
     * ```
     * protected async performUpdate(): Promise<unknown> {
     *   await new Promise((resolve) => requestAnimationFrame(() => resolve()));
     *   super.performUpdate();
     * }
     * ```
     */performUpdate(){// Mixin instance properties once, if they exist.
if(this._instanceProperties){this._applyInstanceProperties()}let shouldUpdate=!1;const changedProperties=this._changedProperties;try{shouldUpdate=this.shouldUpdate(changedProperties);if(shouldUpdate){this.update(changedProperties)}}catch(e){// Prevent `firstUpdated` and `updated` from running when there's an
// update exception.
shouldUpdate=!1;throw e}finally{// Ensure element can accept additional updates after an exception.
this._markUpdated()}if(shouldUpdate){if(!(this._updateState&STATE_HAS_UPDATED)){this._updateState=this._updateState|STATE_HAS_UPDATED;this.firstUpdated(changedProperties)}this.updated(changedProperties)}}_markUpdated(){this._changedProperties=new Map;this._updateState=this._updateState&~STATE_UPDATE_REQUESTED}/**
     * Returns a Promise that resolves when the element has completed updating.
     * The Promise value is a boolean that is `true` if the element completed the
     * update without triggering another update. The Promise result is `false` if
     * a property was set inside `updated()`. If the Promise is rejected, an
     * exception was thrown during the update.
     *
     * To await additional asynchronous work, override the `_getUpdateComplete`
     * method. For example, it is sometimes useful to await a rendered element
     * before fulfilling this Promise. To do this, first await
     * `super._getUpdateComplete()`, then any subsequent state.
     *
     * @returns {Promise} The Promise returns a boolean that indicates if the
     * update resolved without triggering another update.
     */get updateComplete(){return this._getUpdateComplete()}/**
     * Override point for the `updateComplete` promise.
     *
     * It is not safe to override the `updateComplete` getter directly due to a
     * limitation in TypeScript which means it is not possible to call a
     * superclass getter (e.g. `super.updateComplete.then(...)`) when the target
     * language is ES5 (https://github.com/microsoft/TypeScript/issues/338).
     * This method should be overridden instead. For example:
     *
     *   class MyElement extends LitElement {
     *     async _getUpdateComplete() {
     *       await super._getUpdateComplete();
     *       await this._myChild.updateComplete;
     *     }
     *   }
     */_getUpdateComplete(){return this._updatePromise}/**
     * Controls whether or not `update` should be called when the element requests
     * an update. By default, this method always returns `true`, but this can be
     * customized to control when to update.
     *
     * * @param _changedProperties Map of changed properties with old values
     */shouldUpdate(_changedProperties){return!0}/**
     * Updates the element. This method reflects property values to attributes.
     * It can be overridden to render and keep updated element DOM.
     * Setting properties inside this method will *not* trigger
     * another update.
     *
     * * @param _changedProperties Map of changed properties with old values
     */update(_changedProperties){if(this._reflectingProperties!==void 0&&0<this._reflectingProperties.size){// Use forEach so this works even if for/of loops are compiled to for
// loops expecting arrays
this._reflectingProperties.forEach((v,k)=>this._propertyToAttribute(k,this[k],v));this._reflectingProperties=void 0}}/**
     * Invoked whenever the element is updated. Implement to perform
     * post-updating tasks via DOM APIs, for example, focusing an element.
     *
     * Setting properties inside this method will trigger the element to update
     * again after this update cycle completes.
     *
     * * @param _changedProperties Map of changed properties with old values
     */updated(_changedProperties){}/**
                                  * Invoked when the element is first updated. Implement to perform one time
                                  * work on the element after update.
                                  *
                                  * Setting properties inside this method will trigger the element to update
                                  * again after this update cycle completes.
                                  *
                                  * * @param _changedProperties Map of changed properties with old values
                                  */firstUpdated(_changedProperties){}}_exports.UpdatingElement$1=_exports.UpdatingElement=UpdatingElement;_a=finalized;/**
                 * Marks class as having finished creating properties.
                 */UpdatingElement[_a]=!0;var updatingElement={defaultConverter:defaultConverter,notEqual:notEqual,UpdatingElement:UpdatingElement};/**
    * @license
    * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
    * This code may only be used under the BSD style license found at
    * http://polymer.github.io/LICENSE.txt
    * The complete set of authors may be found at
    * http://polymer.github.io/AUTHORS.txt
    * The complete set of contributors may be found at
    * http://polymer.github.io/CONTRIBUTORS.txt
    * Code distributed by Google as part of the polymer project is also
    * subject to an additional IP rights grant found at
    * http://polymer.github.io/PATENTS.txt
    */_exports.$updatingElement=updatingElement;const directives=new WeakMap,directive=f=>(...args)=>{const d=f(...args);directives.set(d,!0);return d};/**
                                   * Brands a function as a directive factory function so that lit-html will call
                                   * the function during template rendering, rather than passing as a value.
                                   *
                                   * A _directive_ is a function that takes a Part as an argument. It has the
                                   * signature: `(part: Part) => void`.
                                   *
                                   * A directive _factory_ is a function that takes arguments for data and
                                   * configuration and returns a directive. Users of directive usually refer to
                                   * the directive factory as the directive. For example, "The repeat directive".
                                   *
                                   * Usually a template author will invoke a directive factory in their template
                                   * with relevant arguments, which will then return a directive function.
                                   *
                                   * Here's an example of using the `repeat()` directive factory that takes an
                                   * array and a function to render an item:
                                   *
                                   * ```js
                                   * html`<ul><${repeat(items, (item) => html`<li>${item}</li>`)}</ul>`
                                   * ```
                                   *
                                   * When `repeat` is invoked, it returns a directive function that closes over
                                   * `items` and the template function. When the outer template is rendered, the
                                   * return directive function is called with the Part for the expression.
                                   * `repeat` then performs it's custom logic to render multiple items.
                                   *
                                   * @param f The directive factory function. Must be a function that returns a
                                   * function of the signature `(part: Part) => void`. The returned function will
                                   * be called with the part object.
                                   *
                                   * @example
                                   *
                                   * import {directive, html} from 'lit-html';
                                   *
                                   * const immutable = directive((v) => (part) => {
                                   *   if (part.value !== v) {
                                   *     part.setValue(v)
                                   *   }
                                   * });
                                   */_exports.directive$1=_exports.directive=directive;const isDirective=o=>{return"function"===typeof o&&directives.has(o)};_exports.isDirective$1=_exports.isDirective=isDirective;var directive$1={directive:directive,isDirective:isDirective};/**
    * @license
    * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
    * This code may only be used under the BSD style license found at
    * http://polymer.github.io/LICENSE.txt
    * The complete set of authors may be found at
    * http://polymer.github.io/AUTHORS.txt
    * The complete set of contributors may be found at
    * http://polymer.github.io/CONTRIBUTORS.txt
    * Code distributed by Google as part of the polymer project is also
    * subject to an additional IP rights grant found at
    * http://polymer.github.io/PATENTS.txt
    */ /**
        * True if the custom elements polyfill is in use.
        */_exports.$directive=directive$1;const isCEPolyfill=window.customElements!==void 0&&window.customElements.polyfillWrapFlushCallback!==void 0;/**
                                                                                                                                   * Reparents nodes, starting from `start` (inclusive) to `end` (exclusive),
                                                                                                                                   * into another container (could be the same container), before `before`. If
                                                                                                                                   * `before` is null, it appends the nodes to the container.
                                                                                                                                   */_exports.isCEPolyfill=isCEPolyfill;const reparentNodes=(container,start,end=null,before=null)=>{while(start!==end){const n=start.nextSibling;container.insertBefore(start,before);start=n}};/**
    * Removes nodes, starting from `start` (inclusive) to `end` (exclusive), from
    * `container`.
    */_exports.reparentNodes$1=_exports.reparentNodes=reparentNodes;const removeNodes=(container,start,end=null)=>{while(start!==end){const n=start.nextSibling;container.removeChild(start);start=n}};_exports.removeNodes$1=_exports.removeNodes=removeNodes;var dom={isCEPolyfill:isCEPolyfill,reparentNodes:reparentNodes,removeNodes:removeNodes};/**
    * @license
    * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
    * This code may only be used under the BSD style license found at
    * http://polymer.github.io/LICENSE.txt
    * The complete set of authors may be found at
    * http://polymer.github.io/AUTHORS.txt
    * The complete set of contributors may be found at
    * http://polymer.github.io/CONTRIBUTORS.txt
    * Code distributed by Google as part of the polymer project is also
    * subject to an additional IP rights grant found at
    * http://polymer.github.io/PATENTS.txt
    */ /**
        * A sentinel value that signals that a value was handled by a directive and
        * should not be written to the DOM.
        */_exports.$dom=dom;const noChange={};/**
                             * A sentinel value that signals a NodePart to fully clear its content.
                             */_exports.noChange$1=_exports.noChange=noChange;const nothing={};_exports.nothing$1=_exports.nothing=nothing;var part={noChange:noChange,nothing:nothing};/**
    * @license
    * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
    * This code may only be used under the BSD style license found at
    * http://polymer.github.io/LICENSE.txt
    * The complete set of authors may be found at
    * http://polymer.github.io/AUTHORS.txt
    * The complete set of contributors may be found at
    * http://polymer.github.io/CONTRIBUTORS.txt
    * Code distributed by Google as part of the polymer project is also
    * subject to an additional IP rights grant found at
    * http://polymer.github.io/PATENTS.txt
    */ /**
        * An expression marker with embedded unique key to avoid collision with
        * possible text in templates.
        */_exports.$part=part;const marker=`{{lit-${(Math.random()+"").slice(2)}}}`;/**
                                                                    * An expression marker used text-positions, multi-binding attributes, and
                                                                    * attributes with markup-like text values.
                                                                    */_exports.marker=marker;const nodeMarker=`<!--${marker}-->`;_exports.nodeMarker=nodeMarker;const markerRegex=new RegExp(`${marker}|${nodeMarker}`);/**
                                                                   * Suffix appended to all bound attribute names.
                                                                   */_exports.markerRegex=markerRegex;const boundAttributeSuffix="$lit$";/**
                                              * An updateable Template that tracks the location of dynamic parts.
                                              */_exports.boundAttributeSuffix=boundAttributeSuffix;class Template{constructor(result,element){this.parts=[];this.element=element;const nodesToRemove=[],stack=[],walker=document.createTreeWalker(element.content,133/* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */,null,!1);// Keeps track of the last index associated with a part. We try to delete
// unnecessary nodes, but we never want to associate two different parts
// to the same index. They must have a constant node between.
let lastPartIndex=0,index=-1,partIndex=0;const{strings,values:{length}}=result;while(partIndex<length){const node=walker.nextNode();if(null===node){// We've exhausted the content inside a nested template element.
// Because we still have parts (the outer for-loop), we know:
// - There is a template in the stack
// - The walker will find a nextNode outside the template
walker.currentNode=stack.pop();continue}index++;if(1===node.nodeType/* Node.ELEMENT_NODE */){if(node.hasAttributes()){const attributes=node.attributes,{length}=attributes;// Per
// https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap,
// attributes are not guaranteed to be returned in document order.
// In particular, Edge/IE can return them out of order, so we cannot
// assume a correspondence between part index and attribute index.
let count=0;for(let i=0;i<length;i++){if(endsWith(attributes[i].name,boundAttributeSuffix)){count++}}while(0<count--){// Get the template literal section leading up to the first
// expression in this attribute
const stringForPart=strings[partIndex],name=lastAttributeNameRegex.exec(stringForPart)[2],attributeLookupName=name.toLowerCase()+boundAttributeSuffix,attributeValue=node.getAttribute(attributeLookupName);// Find the attribute name
node.removeAttribute(attributeLookupName);const statics=attributeValue.split(markerRegex);this.parts.push({type:"attribute",index,name,strings:statics});partIndex+=statics.length-1}}if("TEMPLATE"===node.tagName){stack.push(node);walker.currentNode=node.content}}else if(3===node.nodeType/* Node.TEXT_NODE */){const data=node.data;if(0<=data.indexOf(marker)){const parent=node.parentNode,strings=data.split(markerRegex),lastIndex=strings.length-1;// Generate a new text node for each literal section
// These nodes are also used as the markers for node parts
for(let i=0;i<lastIndex;i++){let insert,s=strings[i];if(""===s){insert=createMarker()}else{const match=lastAttributeNameRegex.exec(s);if(null!==match&&endsWith(match[2],boundAttributeSuffix)){s=s.slice(0,match.index)+match[1]+match[2].slice(0,-boundAttributeSuffix.length)+match[3]}insert=document.createTextNode(s)}parent.insertBefore(insert,node);this.parts.push({type:"node",index:++index})}// If there's no text, we must insert a comment to mark our place.
// Else, we can trust it will stick around after cloning.
if(""===strings[lastIndex]){parent.insertBefore(createMarker(),node);nodesToRemove.push(node)}else{node.data=strings[lastIndex]}// We have a part for each match found
partIndex+=lastIndex}}else if(8===node.nodeType/* Node.COMMENT_NODE */){if(node.data===marker){const parent=node.parentNode;// Add a new marker node to be the startNode of the Part if any of
// the following are true:
//  * We don't have a previousSibling
//  * The previousSibling is already the start of a previous part
if(null===node.previousSibling||index===lastPartIndex){index++;parent.insertBefore(createMarker(),node)}lastPartIndex=index;this.parts.push({type:"node",index});// If we don't have a nextSibling, keep this node so we have an end.
// Else, we can remove it to save future costs.
if(null===node.nextSibling){node.data=""}else{nodesToRemove.push(node);index--}partIndex++}else{let i=-1;while(-1!==(i=node.data.indexOf(marker,i+1))){// Comment node has a binding marker inside, make an inactive part
// The binding won't work, but subsequent bindings will
// TODO (justinfagnani): consider whether it's even worth it to
// make bindings in comments work
this.parts.push({type:"node",index:-1});partIndex++}}}}// Remove text binding nodes after the walk to not disturb the TreeWalker
for(const n of nodesToRemove){n.parentNode.removeChild(n)}}}_exports.Template$1=_exports.Template=Template;const endsWith=(str,suffix)=>{const index=str.length-suffix.length;return 0<=index&&str.slice(index)===suffix},isTemplatePartActive=part=>-1!==part.index;_exports.isTemplatePartActive$1=_exports.isTemplatePartActive=isTemplatePartActive;// Allows `document.createComment('')` to be renamed for a
// small manual size-savings.
const createMarker=()=>document.createComment("");/**
                                                               * This regex extracts the attribute name preceding an attribute-position
                                                               * expression. It does this by matching the syntax allowed for attributes
                                                               * against the string literal directly preceding the expression, assuming that
                                                               * the expression is in an attribute-value position.
                                                               *
                                                               * See attributes in the HTML spec:
                                                               * https://www.w3.org/TR/html5/syntax.html#elements-attributes
                                                               *
                                                               * " \x09\x0a\x0c\x0d" are HTML space characters:
                                                               * https://www.w3.org/TR/html5/infrastructure.html#space-characters
                                                               *
                                                               * "\0-\x1F\x7F-\x9F" are Unicode control characters, which includes every
                                                               * space character except " ".
                                                               *
                                                               * So an attribute is:
                                                               *  * The name: any character except a control character, space character, ('),
                                                               *    ("), ">", "=", or "/"
                                                               *  * Followed by zero or more space characters
                                                               *  * Followed by "="
                                                               *  * Followed by zero or more space characters
                                                               *  * Followed by:
                                                               *    * Any character except space, ('), ("), "<", ">", "=", (`), or
                                                               *    * (") then any non-("), or
                                                               *    * (') then any non-(')
                                                               */_exports.createMarker$1=_exports.createMarker=createMarker;const lastAttributeNameRegex=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;_exports.lastAttributeNameRegex=lastAttributeNameRegex;var template={marker:marker,nodeMarker:nodeMarker,markerRegex:markerRegex,boundAttributeSuffix:boundAttributeSuffix,Template:Template,isTemplatePartActive:isTemplatePartActive,createMarker:createMarker,lastAttributeNameRegex:lastAttributeNameRegex};_exports.$template=template;class TemplateInstance{constructor(template,processor,options){this.__parts=[];this.template=template;this.processor=processor;this.options=options}update(values){let i=0;for(const part of this.__parts){if(part!==void 0){part.setValue(values[i])}i++}for(const part of this.__parts){if(part!==void 0){part.commit()}}}_clone(){// There are a number of steps in the lifecycle of a template instance's
// DOM fragment:
//  1. Clone - create the instance fragment
//  2. Adopt - adopt into the main document
//  3. Process - find part markers and create parts
//  4. Upgrade - upgrade custom elements
//  5. Update - set node, attribute, property, etc., values
//  6. Connect - connect to the document. Optional and outside of this
//     method.
//
// We have a few constraints on the ordering of these steps:
//  * We need to upgrade before updating, so that property values will pass
//    through any property setters.
//  * We would like to process before upgrading so that we're sure that the
//    cloned fragment is inert and not disturbed by self-modifying DOM.
//  * We want custom elements to upgrade even in disconnected fragments.
//
// Given these constraints, with full custom elements support we would
// prefer the order: Clone, Process, Adopt, Upgrade, Update, Connect
//
// But Safari dooes not implement CustomElementRegistry#upgrade, so we
// can not implement that order and still have upgrade-before-update and
// upgrade disconnected fragments. So we instead sacrifice the
// process-before-upgrade constraint, since in Custom Elements v1 elements
// must not modify their light DOM in the constructor. We still have issues
// when co-existing with CEv0 elements like Polymer 1, and with polyfills
// that don't strictly adhere to the no-modification rule because shadow
// DOM, which may be created in the constructor, is emulated by being placed
// in the light DOM.
//
// The resulting order is on native is: Clone, Adopt, Upgrade, Process,
// Update, Connect. document.importNode() performs Clone, Adopt, and Upgrade
// in one step.
//
// The Custom Elements v1 polyfill supports upgrade(), so the order when
// polyfilled is the more ideal: Clone, Process, Adopt, Upgrade, Update,
// Connect.
const fragment=isCEPolyfill?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),stack=[],parts=this.template.parts,walker=document.createTreeWalker(fragment,133/* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */,null,!1);let partIndex=0,nodeIndex=0,part,node=walker.nextNode();// Loop through all the nodes and parts of a template
while(partIndex<parts.length){part=parts[partIndex];if(!isTemplatePartActive(part)){this.__parts.push(void 0);partIndex++;continue}// Progress the tree walker until we find our next part's node.
// Note that multiple parts may share the same node (attribute parts
// on a single element), so this loop may not run at all.
while(nodeIndex<part.index){nodeIndex++;if("TEMPLATE"===node.nodeName){stack.push(node);walker.currentNode=node.content}if(null===(node=walker.nextNode())){// We've exhausted the content inside a nested template element.
// Because we still have parts (the outer for-loop), we know:
// - There is a template in the stack
// - The walker will find a nextNode outside the template
walker.currentNode=stack.pop();node=walker.nextNode()}}// We've arrived at our part's node.
if("node"===part.type){const part=this.processor.handleTextExpression(this.options);part.insertAfterNode(node.previousSibling);this.__parts.push(part)}else{this.__parts.push(...this.processor.handleAttributeExpressions(node,part.name,part.strings,this.options))}partIndex++}if(isCEPolyfill){document.adoptNode(fragment);customElements.upgrade(fragment)}return fragment}}_exports.TemplateInstance$1=_exports.TemplateInstance=TemplateInstance;var templateInstance={TemplateInstance:TemplateInstance};_exports.$templateInstance=templateInstance;const commentMarker=` ${marker} `;/**
                                      * The return type of `html`, which holds a Template and the values from
                                      * interpolated expressions.
                                      */class TemplateResult{constructor(strings,values,type,processor){this.strings=strings;this.values=values;this.type=type;this.processor=processor}/**
     * Returns a string of HTML used to create a `<template>` element.
     */getHTML(){const l=this.strings.length-1;let html="",isCommentBinding=!1;for(let i=0;i<l;i++){const s=this.strings[i],commentOpen=s.lastIndexOf("<!--");// For each binding we want to determine the kind of marker to insert
// into the template source before it's parsed by the browser's HTML
// parser. The marker type is based on whether the expression is in an
// attribute, text, or comment poisition.
//   * For node-position bindings we insert a comment with the marker
//     sentinel as its text content, like <!--{{lit-guid}}-->.
//   * For attribute bindings we insert just the marker sentinel for the
//     first binding, so that we support unquoted attribute bindings.
//     Subsequent bindings can use a comment marker because multi-binding
//     attributes must be quoted.
//   * For comment bindings we insert just the marker sentinel so we don't
//     close the comment.
//
// The following code scans the template source, but is *not* an HTML
// parser. We don't need to track the tree structure of the HTML, only
// whether a binding is inside a comment, and if not, if it appears to be
// the first binding in an attribute.
// We're in comment position if we have a comment open with no following
// comment close. Because <-- can appear in an attribute value there can
// be false positives.
isCommentBinding=(-1<commentOpen||isCommentBinding)&&-1===s.indexOf("-->",commentOpen+1);// Check to see if we have an attribute-like sequence preceeding the
// expression. This can match "name=value" like structures in text,
// comments, and attribute values, so there can be false-positives.
const attributeMatch=lastAttributeNameRegex.exec(s);if(null===attributeMatch){// We're only in this branch if we don't have a attribute-like
// preceeding sequence. For comments, this guards against unusual
// attribute values like <div foo="<!--${'bar'}">. Cases like
// <!-- foo=${'bar'}--> are handled correctly in the attribute branch
// below.
html+=s+(isCommentBinding?commentMarker:nodeMarker)}else{// For attributes we use just a marker sentinel, and also append a
// $lit$ suffix to the name to opt-out of attribute-specific parsing
// that IE and Edge do for style and certain SVG attributes.
html+=s.substr(0,attributeMatch.index)+attributeMatch[1]+attributeMatch[2]+boundAttributeSuffix+attributeMatch[3]+marker}}html+=this.strings[l];return html}getTemplateElement(){const template=document.createElement("template");template.innerHTML=this.getHTML();return template}}/**
   * A TemplateResult for SVG fragments.
   *
   * This class wraps HTML in an `<svg>` tag in order to parse its contents in the
   * SVG namespace, then modifies the template to remove the `<svg>` tag so that
   * clones only container the original fragment.
   */_exports.TemplateResult$3=_exports.TemplateResult$2=_exports.TemplateResult$1=_exports.TemplateResult=TemplateResult;class SVGTemplateResult extends TemplateResult{getHTML(){return`<svg>${super.getHTML()}</svg>`}getTemplateElement(){const template=super.getTemplateElement(),content=template.content,svgElement=content.firstChild;content.removeChild(svgElement);reparentNodes(content,svgElement.firstChild);return template}}_exports.SVGTemplateResult$2=_exports.SVGTemplateResult$1=_exports.SVGTemplateResult=SVGTemplateResult;var templateResult={TemplateResult:TemplateResult,SVGTemplateResult:SVGTemplateResult};_exports.$templateResult=templateResult;const isPrimitive=value=>{return null===value||!("object"===typeof value||"function"===typeof value)};_exports.isPrimitive$1=_exports.isPrimitive=isPrimitive;const isIterable=value=>{return Array.isArray(value)||// tslint:disable-next-line:no-any
!!(value&&value[Symbol.iterator])};/**
    * Writes attribute values to the DOM for a group of AttributeParts bound to a
    * single attibute. The value is only set once even if there are multiple parts
    * for an attribute.
    */_exports.isIterable$1=_exports.isIterable=isIterable;class AttributeCommitter{constructor(element,name,strings){this.dirty=!0;this.element=element;this.name=name;this.strings=strings;this.parts=[];for(let i=0;i<strings.length-1;i++){this.parts[i]=this._createPart()}}/**
     * Creates a single part. Override this to create a differnt type of part.
     */_createPart(){return new AttributePart(this)}_getValue(){const strings=this.strings,l=strings.length-1;let text="";for(let i=0;i<l;i++){text+=strings[i];const part=this.parts[i];if(part!==void 0){const v=part.value;if(isPrimitive(v)||!isIterable(v)){text+="string"===typeof v?v:v+""}else{for(const t of v){text+="string"===typeof t?t:t+""}}}}text+=strings[l];return text}commit(){if(this.dirty){this.dirty=!1;this.element.setAttribute(this.name,this._getValue())}}}/**
   * A Part that controls all or part of an attribute value.
   */_exports.AttributeCommitter$1=_exports.AttributeCommitter=AttributeCommitter;class AttributePart{constructor(committer){this.value=void 0;this.committer=committer}setValue(value){if(value!==noChange&&(!isPrimitive(value)||value!==this.value)){this.value=value;// If the value is a not a directive, dirty the committer so that it'll
// call setAttribute. If the value is a directive, it'll dirty the
// committer if it calls setValue().
if(!isDirective(value)){this.committer.dirty=!0}}}commit(){while(isDirective(this.value)){const directive=this.value;this.value=noChange;directive(this)}if(this.value===noChange){return}this.committer.commit()}}/**
   * A Part that controls a location within a Node tree. Like a Range, NodePart
   * has start and end locations and can set and update the Nodes between those
   * locations.
   *
   * NodeParts support several value types: primitives, Nodes, TemplateResults,
   * as well as arrays and iterables of those types.
   */_exports.AttributePart$1=_exports.AttributePart=AttributePart;class NodePart{constructor(options){this.value=void 0;this.__pendingValue=void 0;this.options=options}/**
     * Appends this part into a container.
     *
     * This part must be empty, as its contents are not automatically moved.
     */appendInto(container){this.startNode=container.appendChild(createMarker());this.endNode=container.appendChild(createMarker())}/**
     * Inserts this part after the `ref` node (between `ref` and `ref`'s next
     * sibling). Both `ref` and its next sibling must be static, unchanging nodes
     * such as those that appear in a literal section of a template.
     *
     * This part must be empty, as its contents are not automatically moved.
     */insertAfterNode(ref){this.startNode=ref;this.endNode=ref.nextSibling}/**
     * Appends this part into a parent part.
     *
     * This part must be empty, as its contents are not automatically moved.
     */appendIntoPart(part){part.__insert(this.startNode=createMarker());part.__insert(this.endNode=createMarker())}/**
     * Inserts this part after the `ref` part.
     *
     * This part must be empty, as its contents are not automatically moved.
     */insertAfterPart(ref){ref.__insert(this.startNode=createMarker());this.endNode=ref.endNode;ref.endNode=this.startNode}setValue(value){this.__pendingValue=value}commit(){while(isDirective(this.__pendingValue)){const directive=this.__pendingValue;this.__pendingValue=noChange;directive(this)}const value=this.__pendingValue;if(value===noChange){return}if(isPrimitive(value)){if(value!==this.value){this.__commitText(value)}}else if(value instanceof TemplateResult){this.__commitTemplateResult(value)}else if(value instanceof Node){this.__commitNode(value)}else if(isIterable(value)){this.__commitIterable(value)}else if(value===nothing){this.value=nothing;this.clear()}else{// Fallback, will render the string representation
this.__commitText(value)}}__insert(node){this.endNode.parentNode.insertBefore(node,this.endNode)}__commitNode(value){if(this.value===value){return}this.clear();this.__insert(value);this.value=value}__commitText(value){const node=this.startNode.nextSibling;value=null==value?"":value;// If `value` isn't already a string, we explicitly convert it here in case
// it can't be implicitly converted - i.e. it's a symbol.
const valueAsString="string"===typeof value?value:value+"";if(node===this.endNode.previousSibling&&3===node.nodeType/* Node.TEXT_NODE */){// If we only have a single text node between the markers, we can just
// set its value, rather than replacing it.
// TODO(justinfagnani): Can we just check if this.value is primitive?
node.data=valueAsString}else{this.__commitNode(document.createTextNode(valueAsString))}this.value=value}__commitTemplateResult(value){const template=this.options.templateFactory(value);if(this.value instanceof TemplateInstance&&this.value.template===template){this.value.update(value.values)}else{// Make sure we propagate the template processor from the TemplateResult
// so that we use its syntax extension, etc. The template factory comes
// from the render function options so that it can control template
// caching and preprocessing.
const instance=new TemplateInstance(template,value.processor,this.options),fragment=instance._clone();instance.update(value.values);this.__commitNode(fragment);this.value=instance}}__commitIterable(value){// For an Iterable, we create a new InstancePart per item, then set its
// value to the item. This is a little bit of overhead for every item in
// an Iterable, but it lets us recurse easily and efficiently update Arrays
// of TemplateResults that will be commonly returned from expressions like:
// array.map((i) => html`${i}`), by reusing existing TemplateInstances.
// If _value is an array, then the previous render was of an
// iterable and _value will contain the NodeParts from the previous
// render. If _value is not an array, clear this part and make a new
// array for NodeParts.
if(!Array.isArray(this.value)){this.value=[];this.clear()}// Lets us keep track of how many items we stamped so we can clear leftover
// items from a previous render
const itemParts=this.value;let partIndex=0,itemPart;for(const item of value){// Try to reuse an existing part
itemPart=itemParts[partIndex];// If no existing part, create a new one
if(itemPart===void 0){itemPart=new NodePart(this.options);itemParts.push(itemPart);if(0===partIndex){itemPart.appendIntoPart(this)}else{itemPart.insertAfterPart(itemParts[partIndex-1])}}itemPart.setValue(item);itemPart.commit();partIndex++}if(partIndex<itemParts.length){// Truncate the parts array so _value reflects the current state
itemParts.length=partIndex;this.clear(itemPart&&itemPart.endNode)}}clear(startNode=this.startNode){removeNodes(this.startNode.parentNode,startNode.nextSibling,this.endNode)}}/**
   * Implements a boolean attribute, roughly as defined in the HTML
   * specification.
   *
   * If the value is truthy, then the attribute is present with a value of
   * ''. If the value is falsey, the attribute is removed.
   */_exports.NodePart$1=_exports.NodePart=NodePart;class BooleanAttributePart{constructor(element,name,strings){this.value=void 0;this.__pendingValue=void 0;if(2!==strings.length||""!==strings[0]||""!==strings[1]){throw new Error("Boolean attributes can only contain a single expression")}this.element=element;this.name=name;this.strings=strings}setValue(value){this.__pendingValue=value}commit(){while(isDirective(this.__pendingValue)){const directive=this.__pendingValue;this.__pendingValue=noChange;directive(this)}if(this.__pendingValue===noChange){return}const value=!!this.__pendingValue;if(this.value!==value){if(value){this.element.setAttribute(this.name,"")}else{this.element.removeAttribute(this.name)}this.value=value}this.__pendingValue=noChange}}/**
   * Sets attribute values for PropertyParts, so that the value is only set once
   * even if there are multiple parts for a property.
   *
   * If an expression controls the whole property value, then the value is simply
   * assigned to the property under control. If there are string literals or
   * multiple expressions, then the strings are expressions are interpolated into
   * a string first.
   */_exports.BooleanAttributePart$1=_exports.BooleanAttributePart=BooleanAttributePart;class PropertyCommitter extends AttributeCommitter{constructor(element,name,strings){super(element,name,strings);this.single=2===strings.length&&""===strings[0]&&""===strings[1]}_createPart(){return new PropertyPart(this)}_getValue(){if(this.single){return this.parts[0].value}return super._getValue()}commit(){if(this.dirty){this.dirty=!1;// tslint:disable-next-line:no-any
this.element[this.name]=this._getValue()}}}_exports.PropertyCommitter$1=_exports.PropertyCommitter=PropertyCommitter;class PropertyPart extends AttributePart{}// Detect event listener options support. If the `capture` property is read
// from the options object, then options are supported. If not, then the thrid
// argument to add/removeEventListener is interpreted as the boolean capture
// value so we should only pass the `capture` property.
_exports.PropertyPart$1=_exports.PropertyPart=PropertyPart;let eventOptionsSupported=!1;try{const options={get capture(){eventOptionsSupported=!0;return!1}};// tslint:disable-next-line:no-any
window.addEventListener("test",options,options);// tslint:disable-next-line:no-any
window.removeEventListener("test",options,options)}catch(_e){}class EventPart{constructor(element,eventName,eventContext){this.value=void 0;this.__pendingValue=void 0;this.element=element;this.eventName=eventName;this.eventContext=eventContext;this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(value){this.__pendingValue=value}commit(){while(isDirective(this.__pendingValue)){const directive=this.__pendingValue;this.__pendingValue=noChange;directive(this)}if(this.__pendingValue===noChange){return}const newListener=this.__pendingValue,oldListener=this.value,shouldRemoveListener=null==newListener||null!=oldListener&&(newListener.capture!==oldListener.capture||newListener.once!==oldListener.once||newListener.passive!==oldListener.passive),shouldAddListener=null!=newListener&&(null==oldListener||shouldRemoveListener);if(shouldRemoveListener){this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options)}if(shouldAddListener){this.__options=getOptions(newListener);this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)}this.value=newListener;this.__pendingValue=noChange}handleEvent(event){if("function"===typeof this.value){this.value.call(this.eventContext||this.element,event)}else{this.value.handleEvent(event)}}}// We copy options because of the inconsistent behavior of browsers when reading
// the third argument of add/removeEventListener. IE11 doesn't support options
// at all. Chrome 41 only reads `capture` if the argument is an object.
_exports.EventPart$1=_exports.EventPart=EventPart;const getOptions=o=>o&&(eventOptionsSupported?{capture:o.capture,passive:o.passive,once:o.once}:o.capture);var parts={isPrimitive:isPrimitive,isIterable:isIterable,AttributeCommitter:AttributeCommitter,AttributePart:AttributePart,NodePart:NodePart,BooleanAttributePart:BooleanAttributePart,PropertyCommitter:PropertyCommitter,PropertyPart:PropertyPart,EventPart:EventPart};_exports.$parts=parts;class DefaultTemplateProcessor{/**
   * Create parts for an attribute-position binding, given the event, attribute
   * name, and string literals.
   *
   * @param element The element containing the binding
   * @param name  The attribute name
   * @param strings The string literals. There are always at least two strings,
   *   event for fully-controlled bindings with a single expression.
   */handleAttributeExpressions(element,name,strings,options){const prefix=name[0];if("."===prefix){const committer=new PropertyCommitter(element,name.slice(1),strings);return committer.parts}if("@"===prefix){return[new EventPart(element,name.slice(1),options.eventContext)]}if("?"===prefix){return[new BooleanAttributePart(element,name.slice(1),strings)]}const committer=new AttributeCommitter(element,name,strings);return committer.parts}/**
     * Create parts for a text-position binding.
     * @param templateFactory
     */handleTextExpression(options){return new NodePart(options)}}_exports.DefaultTemplateProcessor$1=_exports.DefaultTemplateProcessor=DefaultTemplateProcessor;const defaultTemplateProcessor=new DefaultTemplateProcessor;_exports.defaultTemplateProcessor$1=_exports.defaultTemplateProcessor=defaultTemplateProcessor;var defaultTemplateProcessor$1={DefaultTemplateProcessor:DefaultTemplateProcessor,defaultTemplateProcessor:defaultTemplateProcessor};_exports.$defaultTemplateProcessor=defaultTemplateProcessor$1;function templateFactory(result){let templateCache=templateCaches.get(result.type);if(templateCache===void 0){templateCache={stringsArray:new WeakMap,keyString:new Map};templateCaches.set(result.type,templateCache)}let template=templateCache.stringsArray.get(result.strings);if(template!==void 0){return template}// If the TemplateStringsArray is new, generate a key from the strings
// This key is shared between all templates with identical content
const key=result.strings.join(marker);// Check if we already have a Template for this key
template=templateCache.keyString.get(key);if(template===void 0){// If we have not seen this key before, create a new Template
template=new Template(result,result.getTemplateElement());// Cache the Template for this key
templateCache.keyString.set(key,template)}// Cache all future queries for this TemplateStringsArray
templateCache.stringsArray.set(result.strings,template);return template}const templateCaches=new Map;_exports.templateCaches$1=_exports.templateCaches=templateCaches;var templateFactory$1={templateFactory:templateFactory,templateCaches:templateCaches};_exports.$templateFactory=templateFactory$1;const parts$1=new WeakMap;/**
                                     * Renders a template result or other value to a container.
                                     *
                                     * To update a container with new values, reevaluate the template literal and
                                     * call `render` with the new result.
                                     *
                                     * @param result Any value renderable by NodePart - typically a TemplateResult
                                     *     created by evaluating a template tag like `html` or `svg`.
                                     * @param container A DOM parent to render to. The entire contents are either
                                     *     replaced, or efficiently updated if the same result type was previous
                                     *     rendered there.
                                     * @param options RenderOptions for the entire render tree rendered to this
                                     *     container. Render options must *not* change between renders to the same
                                     *     container, as those changes will not effect previously rendered DOM.
                                     */_exports.parts$1=_exports.parts=parts$1;const render=(result,container,options)=>{let part=parts$1.get(container);if(part===void 0){removeNodes(container,container.firstChild);parts$1.set(container,part=new NodePart(Object.assign({templateFactory},options)));part.appendInto(container)}part.setValue(result);part.commit()};_exports.render$2=_exports.render=render;var render$1={parts:parts$1,render:render};// This line will be used in regexes to search for lit-html usage.
// TODO(justinfagnani): inject version number at build time
_exports.$render=render$1;(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.1.2");/**
                                                                                * Interprets a template literal as an HTML template that can efficiently
                                                                                * render to and update a container.
                                                                                */const html=(strings,...values)=>new TemplateResult(strings,values,"html",defaultTemplateProcessor);/**
                                                                                                                    * Interprets a template literal as an SVG template that can efficiently
                                                                                                                    * render to and update a container.
                                                                                                                    */_exports.html$2=_exports.html$1=_exports.html=html;const svg=(strings,...values)=>new SVGTemplateResult(strings,values,"svg",defaultTemplateProcessor);_exports.svg$2=_exports.svg$1=_exports.svg=svg;var litHtml={html:html,svg:svg,DefaultTemplateProcessor:DefaultTemplateProcessor,defaultTemplateProcessor:defaultTemplateProcessor,directive:directive,isDirective:isDirective,removeNodes:removeNodes,reparentNodes:reparentNodes,noChange:noChange,nothing:nothing,AttributeCommitter:AttributeCommitter,AttributePart:AttributePart,BooleanAttributePart:BooleanAttributePart,EventPart:EventPart,isIterable:isIterable,isPrimitive:isPrimitive,NodePart:NodePart,PropertyCommitter:PropertyCommitter,PropertyPart:PropertyPart,parts:parts$1,render:render,templateCaches:templateCaches,templateFactory:templateFactory,TemplateInstance:TemplateInstance,SVGTemplateResult:SVGTemplateResult,TemplateResult:TemplateResult,createMarker:createMarker,isTemplatePartActive:isTemplatePartActive,Template:Template};_exports.$litHtml=litHtml;const walkerNodeFilter=133/* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */;/**
                                                                            * Removes the list of nodes from a Template safely. In addition to removing
                                                                            * nodes from the Template, the Template part indices are updated to match
                                                                            * the mutated Template DOM.
                                                                            *
                                                                            * As the template is walked the removal state is tracked and
                                                                            * part indices are adjusted as needed.
                                                                            *
                                                                            * div
                                                                            *   div#1 (remove) <-- start removing (removing node is div#1)
                                                                            *     div
                                                                            *       div#2 (remove)  <-- continue removing (removing node is still div#1)
                                                                            *         div
                                                                            * div <-- stop removing since previous sibling is the removing node (div#1,
                                                                            * removed 4 nodes)
                                                                            */function removeNodesFromTemplate(template,nodesToRemove){const{element:{content},parts}=template,walker=document.createTreeWalker(content,walkerNodeFilter,null,!1);let partIndex=nextActiveIndexInTemplateParts(parts),part=parts[partIndex],nodeIndex=-1,removeCount=0;const nodesToRemoveInTemplate=[];let currentRemovingNode=null;while(walker.nextNode()){nodeIndex++;const node=walker.currentNode;// End removal if stepped past the removing node
if(node.previousSibling===currentRemovingNode){currentRemovingNode=null}// A node to remove was found in the template
if(nodesToRemove.has(node)){nodesToRemoveInTemplate.push(node);// Track node we're removing
if(null===currentRemovingNode){currentRemovingNode=node}}// When removing, increment count by which to adjust subsequent part indices
if(null!==currentRemovingNode){removeCount++}while(part!==void 0&&part.index===nodeIndex){// If part is in a removed node deactivate it by setting index to -1 or
// adjust the index as needed.
part.index=null!==currentRemovingNode?-1:part.index-removeCount;// go to the next active part.
partIndex=nextActiveIndexInTemplateParts(parts,partIndex);part=parts[partIndex]}}nodesToRemoveInTemplate.forEach(n=>n.parentNode.removeChild(n))}const countNodes=node=>{let count=11===node.nodeType/* Node.DOCUMENT_FRAGMENT_NODE */?0:1;const walker=document.createTreeWalker(node,walkerNodeFilter,null,!1);while(walker.nextNode()){count++}return count},nextActiveIndexInTemplateParts=(parts,startIndex=-1)=>{for(let i=startIndex+1;i<parts.length;i++){const part=parts[i];if(isTemplatePartActive(part)){return i}}return-1};/**
    * Inserts the given node into the Template, optionally before the given
    * refNode. In addition to inserting the node into the Template, the Template
    * part indices are updated to match the mutated Template DOM.
    */function insertNodeIntoTemplate(template,node,refNode=null){const{element:{content},parts}=template;// If there's no refNode, then put node at end of template.
// No part indices need to be shifted in this case.
if(null===refNode||refNode===void 0){content.appendChild(node);return}const walker=document.createTreeWalker(content,walkerNodeFilter,null,!1);let partIndex=nextActiveIndexInTemplateParts(parts),insertCount=0,walkerIndex=-1;while(walker.nextNode()){walkerIndex++;const walkerNode=walker.currentNode;if(walkerNode===refNode){insertCount=countNodes(node);refNode.parentNode.insertBefore(node,refNode)}while(-1!==partIndex&&parts[partIndex].index===walkerIndex){// If we've inserted the node, simply adjust all subsequent parts
if(0<insertCount){while(-1!==partIndex){parts[partIndex].index+=insertCount;partIndex=nextActiveIndexInTemplateParts(parts,partIndex)}return}partIndex=nextActiveIndexInTemplateParts(parts,partIndex)}}}var modifyTemplate={removeNodesFromTemplate:removeNodesFromTemplate,insertNodeIntoTemplate:insertNodeIntoTemplate};_exports.$modifyTemplate=modifyTemplate;const getTemplateCacheKey=(type,scopeName)=>`${type}--${scopeName}`;let compatibleShadyCSSVersion=!0;if("undefined"===typeof window.ShadyCSS){compatibleShadyCSSVersion=!1}else if("undefined"===typeof window.ShadyCSS.prepareTemplateDom){console.warn(`Incompatible ShadyCSS version detected. `+`Please update to at least @webcomponents/webcomponentsjs@2.0.2 and `+`@webcomponents/shadycss@1.3.1.`);compatibleShadyCSSVersion=!1}/**
   * Template factory which scopes template DOM using ShadyCSS.
   * @param scopeName {string}
   */const shadyTemplateFactory=scopeName=>result=>{const cacheKey=getTemplateCacheKey(result.type,scopeName);let templateCache=templateCaches.get(cacheKey);if(templateCache===void 0){templateCache={stringsArray:new WeakMap,keyString:new Map};templateCaches.set(cacheKey,templateCache)}let template=templateCache.stringsArray.get(result.strings);if(template!==void 0){return template}const key=result.strings.join(marker);template=templateCache.keyString.get(key);if(template===void 0){const element=result.getTemplateElement();if(compatibleShadyCSSVersion){window.ShadyCSS.prepareTemplateDom(element,scopeName)}template=new Template(result,element);templateCache.keyString.set(key,template)}templateCache.stringsArray.set(result.strings,template);return template},TEMPLATE_TYPES=["html","svg"],removeStylesFromLitTemplates=scopeName=>{TEMPLATE_TYPES.forEach(type=>{const templates=templateCaches.get(getTemplateCacheKey(type,scopeName));if(templates!==void 0){templates.keyString.forEach(template=>{const{element:{content}}=template,styles=new Set;// IE 11 doesn't support the iterable param Set constructor
Array.from(content.querySelectorAll("style")).forEach(s=>{styles.add(s)});removeNodesFromTemplate(template,styles)})}})},shadyRenderSet=new Set,prepareTemplateStyles=(scopeName,renderedDOM,template)=>{shadyRenderSet.add(scopeName);// If `renderedDOM` is stamped from a Template, then we need to edit that
// Template's underlying template element. Otherwise, we create one here
// to give to ShadyCSS, which still requires one while scoping.
const templateElement=!!template?template.element:document.createElement("template"),styles=renderedDOM.querySelectorAll("style"),{length}=styles;// Move styles out of rendered DOM and store.
// If there are no styles, skip unnecessary work
if(0===length){// Ensure prepareTemplateStyles is called to support adding
// styles via `prepareAdoptedCssText` since that requires that
// `prepareTemplateStyles` is called.
//
// ShadyCSS will only update styles containing @apply in the template
// given to `prepareTemplateStyles`. If no lit Template was given,
// ShadyCSS will not be able to update uses of @apply in any relevant
// template. However, this is not a problem because we only create the
// template for the purpose of supporting `prepareAdoptedCssText`,
// which doesn't support @apply at all.
window.ShadyCSS.prepareTemplateStyles(templateElement,scopeName);return}const condensedStyle=document.createElement("style");// Collect styles into a single style. This helps us make sure ShadyCSS
// manipulations will not prevent us from being able to fix up template
// part indices.
// NOTE: collecting styles is inefficient for browsers but ShadyCSS
// currently does this anyway. When it does not, this should be changed.
for(let i=0;i<length;i++){const style=styles[i];style.parentNode.removeChild(style);condensedStyle.textContent+=style.textContent}// Remove styles from nested templates in this scope.
removeStylesFromLitTemplates(scopeName);// And then put the condensed style into the "root" template passed in as
// `template`.
const content=templateElement.content;if(!!template){insertNodeIntoTemplate(template,condensedStyle,content.firstChild)}else{content.insertBefore(condensedStyle,content.firstChild)}// Note, it's important that ShadyCSS gets the template that `lit-html`
// will actually render so that it can update the style inside when
// needed (e.g. @apply native Shadow DOM case).
window.ShadyCSS.prepareTemplateStyles(templateElement,scopeName);const style=content.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==style){// When in native Shadow DOM, ensure the style created by ShadyCSS is
// included in initially rendered output (`renderedDOM`).
renderedDOM.insertBefore(style.cloneNode(!0),renderedDOM.firstChild)}else if(!!template){// When no style is left in the template, parts will be broken as a
// result. To fix this, we put back the style node ShadyCSS removed
// and then tell lit to remove that node from the template.
// There can be no style in the template in 2 cases (1) when Shady DOM
// is in use, ShadyCSS removes all styles, (2) when native Shadow DOM
// is in use ShadyCSS removes the style if it contains no content.
// NOTE, ShadyCSS creates its own style so we can safely add/remove
// `condensedStyle` here.
content.insertBefore(condensedStyle,content.firstChild);const removes=new Set([condensedStyle]);removeNodesFromTemplate(template,removes)}},render$2=(result,container,options)=>{if(!options||"object"!==typeof options||!options.scopeName){throw new Error("The `scopeName` option is required.")}const scopeName=options.scopeName,hasRendered=parts$1.has(container),needsScoping=compatibleShadyCSSVersion&&11===container.nodeType/* Node.DOCUMENT_FRAGMENT_NODE */&&!!container.host,firstScopeRender=needsScoping&&!shadyRenderSet.has(scopeName),renderContainer=firstScopeRender?document.createDocumentFragment():container;render(result,renderContainer,Object.assign({templateFactory:shadyTemplateFactory(scopeName)},options));// When performing first scope render,
// (1) We've rendered into a fragment so that there's a chance to
// `prepareTemplateStyles` before sub-elements hit the DOM
// (which might cause them to render based on a common pattern of
// rendering in a custom element's `connectedCallback`);
// (2) Scope the template with ShadyCSS one time only for this scope.
// (3) Render the fragment into the container and make sure the
// container knows its `part` is the one we just rendered. This ensures
// DOM will be re-used on subsequent renders.
if(firstScopeRender){const part=parts$1.get(renderContainer);parts$1.delete(renderContainer);// ShadyCSS might have style sheets (e.g. from `prepareAdoptedCssText`)
// that should apply to `renderContainer` even if the rendered value is
// not a TemplateInstance. However, it will only insert scoped styles
// into the document if `prepareTemplateStyles` has already been called
// for the given scope name.
const template=part.value instanceof TemplateInstance?part.value.template:void 0;prepareTemplateStyles(scopeName,renderContainer,template);removeNodes(container,container.firstChild);container.appendChild(renderContainer);parts$1.set(container,part)}// After elements have hit the DOM, update styling if this is the
// initial render to this container.
// This is needed whenever dynamic changes are made so it would be
// safest to do every render; however, this would regress performance
// so we leave it up to the user to call `ShadyCSS.styleElement`
// for dynamic changes.
if(!hasRendered&&needsScoping){window.ShadyCSS.styleElement(container.host)}};_exports.render$1=render$2;var shadyRender={render:render$2,html:html,svg:svg,TemplateResult:TemplateResult};// IMPORTANT: do not change the property name or the assignment expression.
// This line will be used in regexes to search for LitElement usage.
// TODO(justinfagnani): inject version number at build time
_exports.$shadyRender=shadyRender;(window.litElementVersions||(window.litElementVersions=[])).push("2.2.1");/**
                                                                                      * Minimal implementation of Array.prototype.flat
                                                                                      * @param arr the array to flatten
                                                                                      * @param result the accumlated result
                                                                                      */function arrayFlat(styles,result=[]){for(let i=0,length=styles.length;i<length;i++){const value=styles[i];if(Array.isArray(value)){arrayFlat(value,result)}else{result.push(value)}}return result}/** Deeply flattens styles array. Uses native flat if available. */const flattenStyles=styles=>styles.flat?styles.flat(1/0):arrayFlat(styles);class LitElement extends UpdatingElement{/** @nocollapse */static finalize(){// The Closure JS Compiler does not always preserve the correct "this"
// when calling static super methods (b/137460243), so explicitly bind.
super.finalize.call(this);// Prepare styling that is stamped at first render time. Styling
// is built from user provided `styles` or is inherited from the superclass.
this._styles=this.hasOwnProperty(JSCompiler_renameProperty("styles",this))?this._getUniqueStyles():this._styles||[]}/** @nocollapse */static _getUniqueStyles(){// Take care not to call `this.styles` multiple times since this generates
// new CSSResults each time.
// TODO(sorvell): Since we do not cache CSSResults by input, any
// shared styles will generate new stylesheet objects, which is wasteful.
// This should be addressed when a browser ships constructable
// stylesheets.
const userStyles=this.styles,styles=[];if(Array.isArray(userStyles)){const flatStyles=flattenStyles(userStyles),styleSet=flatStyles.reduceRight((set,s)=>{set.add(s);// on IE set.add does not return the set.
return set},new Set);// As a performance optimization to avoid duplicated styling that can
// occur especially when composing via subclassing, de-duplicate styles
// preserving the last item in the list. The last item is kept to
// try to preserve cascade order with the assumption that it's most
// important that last added styles override previous styles.
// Array.from does not work on Set in IE
styleSet.forEach(v=>styles.unshift(v))}else if(userStyles){styles.push(userStyles)}return styles}/**
     * Performs element initialization. By default this calls `createRenderRoot`
     * to create the element `renderRoot` node and captures any pre-set values for
     * registered properties.
     */initialize(){super.initialize();this.renderRoot=this.createRenderRoot();// Note, if renderRoot is not a shadowRoot, styles would/could apply to the
// element's getRootNode(). While this could be done, we're choosing not to
// support this now since it would require different logic around de-duping.
if(window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot){this.adoptStyles()}}/**
     * Returns the node into which the element should render and by default
     * creates and returns an open shadowRoot. Implement to customize where the
     * element's DOM is rendered. For example, to render into the element's
     * childNodes, return `this`.
     * @returns {Element|DocumentFragment} Returns a node into which to render.
     */createRenderRoot(){return this.attachShadow({mode:"open"})}/**
     * Applies styling to the element shadowRoot using the `static get styles`
     * property. Styling will apply using `shadowRoot.adoptedStyleSheets` where
     * available and will fallback otherwise. When Shadow DOM is polyfilled,
     * ShadyCSS scopes styles and adds them to the document. When Shadow DOM
     * is available but `adoptedStyleSheets` is not, styles are appended to the
     * end of the `shadowRoot` to [mimic spec
     * behavior](https://wicg.github.io/construct-stylesheets/#using-constructed-stylesheets).
     */adoptStyles(){const styles=this.constructor._styles;if(0===styles.length){return}// There are three separate cases here based on Shadow DOM support.
// (1) shadowRoot polyfilled: use ShadyCSS
// (2) shadowRoot.adoptedStyleSheets available: use it.
// (3) shadowRoot.adoptedStyleSheets polyfilled: append styles after
// rendering
if(window.ShadyCSS!==void 0&&!window.ShadyCSS.nativeShadow){window.ShadyCSS.ScopingShim.prepareAdoptedCssText(styles.map(s=>s.cssText),this.localName)}else if(supportsAdoptingStyleSheets){this.renderRoot.adoptedStyleSheets=styles.map(s=>s.styleSheet)}else{// This must be done after rendering so the actual style insertion is done
// in `update`.
this._needsShimAdoptedStyleSheets=!0}}connectedCallback(){super.connectedCallback();// Note, first update/render handles styleElement so we only call this if
// connected after first update.
if(this.hasUpdated&&window.ShadyCSS!==void 0){window.ShadyCSS.styleElement(this)}}/**
     * Updates the element. This method reflects property values to attributes
     * and calls `render` to render DOM via lit-html. Setting properties inside
     * this method will *not* trigger another update.
     * * @param _changedProperties Map of changed properties with old values
     */update(changedProperties){super.update(changedProperties);const templateResult=this.render();if(templateResult instanceof TemplateResult){this.constructor.render(templateResult,this.renderRoot,{scopeName:this.localName,eventContext:this})}// When native Shadow DOM is used but adoptedStyles are not supported,
// insert styling after rendering to ensure adoptedStyles have highest
// priority.
if(this._needsShimAdoptedStyleSheets){this._needsShimAdoptedStyleSheets=!1;this.constructor._styles.forEach(s=>{const style=document.createElement("style");style.textContent=s.cssText;this.renderRoot.appendChild(style)})}}/**
     * Invoked on each update to perform rendering tasks. This method must return
     * a lit-html TemplateResult. Setting properties inside this method will *not*
     * trigger the element to update.
     */render(){}}/**
   * Ensure this class is marked as `finalized` as an optimization ensuring
   * it will not needlessly try to `finalize`.
   *
   * Note this property name is a string to prevent breaking Closure JS Compiler
   * optimizations. See updating-element.ts for more information.
   */_exports.LitElement=LitElement;LitElement.finalized=!0;/**
                                 * Render method used to render the lit-html TemplateResult to the element's
                                 * DOM.
                                 * @param {TemplateResult} Template to render.
                                 * @param {Element|DocumentFragment} Node into which to render.
                                 * @param {String} Element name.
                                 * @nocollapse
                                 */LitElement.render=render$2;var litElement={LitElement:LitElement,defaultConverter:defaultConverter,notEqual:notEqual,UpdatingElement:UpdatingElement,customElement:customElement,property:property,query:query,queryAll:queryAll,eventOptions:eventOptions,html:html,svg:svg,TemplateResult:TemplateResult,SVGTemplateResult:SVGTemplateResult,supportsAdoptingStyleSheets:supportsAdoptingStyleSheets,CSSResult:CSSResult,unsafeCSS:unsafeCSS,css:css};_exports.$litElement=litElement;const router=new Router(document.getElementById("outlet"));router.setRoutes([{path:"/",component:"my-app",action:()=>{new Promise((res,rej)=>_require.default(["./my-app.js"],res,rej)).then(bundle=>bundle&&bundle.$myApp||{})}},{path:"/use",component:"page1-component",action:()=>{new Promise((res,rej)=>_require.default(["./page1.js"],res,rej)).then(bundle=>bundle&&bundle.$page1||{})}}])});