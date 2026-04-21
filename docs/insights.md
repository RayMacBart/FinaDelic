# Insights

## 'this' and 'arrow' functions as properties
If methods are created as a property using an arrow function,
'this' inside the method refers to the instance itself:
It resides at the top of the instance's prototype chain and isn't just created in its prototype.
If methods, which are not created as a property, are passed to other classes,
'this' inside the passed method is not bound to the original instance anymore when called there.
Keeping the memory to which instance it belongs can be very useful and necessary in some places.