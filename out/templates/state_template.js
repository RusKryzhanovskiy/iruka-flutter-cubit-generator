"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStateFromTemplate = void 0;
const util = require("../utils/utils");
const Case = require("case");
function createStateFromTemplate(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const targetDirectory = yield util.targetDirectory(Case.snake(name));
        util.writeFile(targetDirectory, `${Case.snake(name)}_state.dart`, stateContent(Case.pascal(name)));
    });
}
exports.createStateFromTemplate = createStateFromTemplate;
function stateContent(name) {
    return `class ${name}State {
	final bool isLoading;
	final String? error;
	  
	const ${name}State({
		this.isLoading = false,
		this.error,
	});
	  
	${name}State copyWith({
		bool? isLoading,
		String? error,
	}) {
		return ${name}State(
			isLoading: isLoading ?? this.isLoading,
			error: error ?? this.error,
		);
	}
}
`;
}
//# sourceMappingURL=state_template.js.map