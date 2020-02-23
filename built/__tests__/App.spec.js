"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_test_renderer_1 = require("react-test-renderer");
var App_1 = require("../App");
describe('<App />', function () {
    var defaultProps = {};
    var wrapper = react_test_renderer_1.default.create(<App_1.default {...defaultProps}/>);
    test('render', function () {
        expect(wrapper).toMatchSnapshot();
    });
});
