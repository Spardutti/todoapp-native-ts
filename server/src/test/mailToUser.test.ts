const mailToUser = require("../main/controllers/Schedule/SendEmail");

test("test", () => {
  expect(mailToUser());
});
