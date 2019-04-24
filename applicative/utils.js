export function log(){
    console.log.apply(null, _.toArray(arguments));
}