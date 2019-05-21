'use static'


function tailFactorial(n, total) {
    if (n === 1) return total;
    return tailFactorial(n - 1, n * total);
}
  
function factorial(n) {
    return tailFactorial(n, 1);
}
  
factorial(1000000);


function f(n, sum){
	if(n == 0) return sum;
	n--;
	sum += n;
	return f(n, sum);
}

f(1000000, 0);