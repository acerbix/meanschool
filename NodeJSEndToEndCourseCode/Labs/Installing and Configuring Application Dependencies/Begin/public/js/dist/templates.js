angular.module("codeWithDan").run(["$templateCache", function($templateCache) {$templateCache.put("app/views/cart.html","<br />\n<div ng-include src=\"\'/app/views/cartItems.html\'\"></div>\n\n<div class=\"row cart-container\">\n    <div class=\"col-md-6 col-xs-12\">\n        <div class=\"discount-code\" ng-show=\"vm.showDiscountCodeSection\">\n            <div ng-show=\"!vm.showDiscountCode\" ng-click=\"vm.displayDiscountCode()\" class=\"pointer\">Have a discount code?</div>\n            <div ng-show=\"vm.showDiscountCode\">\n                <input type=\"text\" ng-model=\"vm.discountCode\" placeholder=\"Enter code\"/>\n                <input type=\"button\"\n                       class=\"btn btn-sm btn-default\"\n                       ng-click=\"vm.applyDiscountCode()\"\n                       value=\"Apply\" />\n            </div>\n            <div ng-show=\"vm.discountCodeMessage\">\n                <br />\n                <span class=\"validationSummary\" ng-class=\"vm.discountCodeClass\">{{ vm.discountCodeMessage }}</span>\n            </div>\n        </div>\n    </div>\n    <div class=\"col-md-6 col-xs-12\">\n        <div class=\"pull-right\">\n            <input type=\"button\"\n                   class=\"btn btn-lg btn-success\"\n                   ng-if=\"vm.cart.total > 0\"\n                   ng-click=\"vm.checkout()\"\n                   value=\"{{vm.checkoutText}}\" />\n        </div>\n    </div>\n</div>\n");
$templateCache.put("app/views/cartItems.html","<div class=\"table-responsive cartContainer\">\n    <table class=\"table table-stripped\">\n        <thead>\n            <tr>\n                <th>Product</th>\n                <th>Quantity</th>\n                <th>Price</th>\n                <th>&nbsp;</th>\n                <th>&nbsp;</th>\n                <th>Total</th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr ng-show=\"!vm.cart || vm.cart.items.length == 0\">\n                <td colspan=\"5\">\n                    <br />\n                    Your cart is currently empty\n                </td>\n            </tr>\n            <tr ng-repeat=\"item in vm.cart.items\">\n                <td><a href=\"/product/{{item.sku}}\">{{ item.title }}</a></td>\n                <td>\n                    <span ng-switch=\"vm.isCartEditable\">\n                        <span ng-switch-when=\"false\">{{item.quantity}}</span>\n                        <span ng-switch-when=\"true\">\n                            <input type=\"text\"\n                                   class=\"quantity\"\n                                   ng-model=\"item.quantity\"\n                                   ng-change=\"vm.updateTotal(item)\" />\n                        </span>\n                    </span>\n                </td>\n                <td>\n                    <span ng-switch=\"item.priceType\">\n                        <span ng-switch-when=\"rentPrice\">{{ item.pricing.rentPrice | currency }}</span>\n                        <span ng-switch-when=\"buyPrice\">{{ item.pricing.buyPrice | currency }}</span>\n                        <span ng-switch-when=\"premiumPrice\">{{ item.pricing.premiumPrice | currency }}</span>\n                        <span ng-switch-when=\"licensePrice\">{{ item.pricing.licensePrice | currency }}</span>\n                    </span>\n                </td>\n                <td ng-if=\"item.discountAmount\">\n                    -{{ item.discountAmount | currency }}\n                </td>\n                <td ng-if=\"!item.discountAmount\">\n                    &nbsp;\n                </td>\n                <td>\n                    <span ng-switch=\"item.priceType\">\n                        <span ng-switch-when=\"rentPrice\">7 Day Rental</span>\n                        <span ng-switch-when=\"buyPrice\">Unlimited Online Access</span>\n                        <span ng-switch-when=\"premiumPrice\">Unlimited Online Access + Video Downloads</span>\n                        <span ng-switch-when=\"licensePrice\">&nbsp;</span>\n                    </span>\n                </td>\n                <td>{{item.total | currency}}</td>\n            </tr>\n            <tr ng-if=\"vm.cart.discountAmount\">\n                <td>&nbsp;</td>\n                <td>&nbsp;</td>\n                <td>&nbsp;</td>\n                <td>&nbsp;</td>\n                <td>{{ vm.cart.discountPercentage }}% discount</td>\n                <td>-{{ vm.cart.discountAmount | currency }}</td>\n            </tr>\n            <tr>\n                <td>&nbsp;</td>\n                <td>&nbsp;</td>\n                <td>&nbsp;</td>\n                <td>&nbsp;</td>\n                <td>&nbsp;</td>\n                <td><h4>{{ vm.cart.total | currency }}</h4></td>\n            </tr>\n        </tbody>\n    </table>\n</div>\n");
$templateCache.put("app/views/checkout.html","<h2>\n    <span class=\"fa fa-shopping-cart\"></span>\n    Check Out\n</h2>\n<br />\n\n<div ng-include src=\"\'/app/views/cartItems.html\'\"></div>\n\n<div>\n    <div class=\"form-group\">\n        <label>Name</label>\n        <br />\n        <input type=\"text\" class=\"form-control\" placeholder=\"Name\" ng-model=\"vm.checkoutData.name\" />\n    </div>\n    <div class=\"form-group\">\n        <label>Credit Card Number</label>\n        <br />\n        <input type=\"tel\" class=\"form-control credit-card\" placeholder=\"CC #\" maxlength=\"19\" ng-model=\"vm.checkoutData.creditCardNumber\"  />\n    </div>\n    <div class=\"form-group form-inline\">\n        <label>Expiration (01/2016)</label>\n        <br />\n        <input type=\"tel\" class=\"form-control\" style=\"width: 65px\" placeholder=\"MM\" maxlength=\"2\" ng-model=\"vm.checkoutData.expirationMonth\" /> /\n        <input type=\"tel\" class=\"form-control\" style=\"width: 65px\" placeholder=\"YYYY\" maxlength=\"4\" ng-model=\"vm.checkoutData.expirationYear\" />\n    </div>\n    <div class=\"form-group\">\n        <label>CVV Code</label>\n        <input type=\"tel\" class=\"form-control credit-card-short\" placeholder=\"cvv\" maxlength=\"4\" ng-model=\"vm.checkoutData.cvvCode\" />\n    </div>\n    <input type=\"submit\" class=\"btn btn-lg btn-success\" ng-disabled=\"vm.orderInProcess\" ng-click=\"vm.completeOrder()\" value=\"Complete Order\" />\n    <input type=\"hidden\" name=\"_csrf\" value=\"{{vm._csrf}}\" />\n</div>\n<br />\n<div class=\"validationSummary\" ng-if=\"vm.error\">\n    <div class=\"alert alert-danger\">{{ vm.error }}</div>\n</div>\n<br />\n");
$templateCache.put("app/views/completedOrder.html","<h2>\r\n    <span class=\"fa fa-shopping-cart\"></span> \r\n    Order Completed\r\n</h2>\r\n<br />\r\n<h4>Thank you. Your order has been completed!</h4>\r\n<br />\r\n<div ng-include src=\"\'/app/views/cartItems.html\'\"></div>");}]);