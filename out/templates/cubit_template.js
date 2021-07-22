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
exports.createCubitFromTemplate = void 0;
const util = require("../utils/utils");
const Case = require("case");
function createCubitFromTemplate(name, targetDir) {
    return __awaiter(this, void 0, void 0, function* () {
        const content = yield cubitContent(Case.pascal(name), targetDir);
        util.writeFile(targetDir, `${Case.snake(name)}_cubit.dart`, content);
    });
}
exports.createCubitFromTemplate = createCubitFromTemplate;
function cubitContent(name, targetDirectory) {
    return __awaiter(this, void 0, void 0, function* () {
        const projectName = yield util.readPubspecYamlProperty('name');
        const stateImport = `import 'package:${projectName}/${targetDirectory.split('/lib/')[1]}/${Case.snake(name)}_state.dart';`;
        return `import 'package:flutter_bloc/flutter_bloc.dart';
${stateImport}

class ${name}Cubit extends Cubit<${name}State> {
	${name}Cubit() : super(${name}State(isLoading: true));
	
	Future<void> loadInitialData() async {
		final stableState = state;
		try {
		  emit(state.copyWith(isLoading: true));
	
		  // TODO your code here
	
		  emit(state.copyWith(isLoading: false));
		} catch (error) {
		  emit(state.copyWith(error: error.toString()));
		  emit(stableState.copyWith(isLoading: false));
		}
	}
}
`;
    });
}
//# sourceMappingURL=cubit_template.js.map