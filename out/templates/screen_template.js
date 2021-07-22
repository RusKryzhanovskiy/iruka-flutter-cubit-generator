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
exports.createScreenFromTemplate = void 0;
const util = require("../utils/utils");
const Case = require("case");
function createScreenFromTemplate(name, targetDir) {
    return __awaiter(this, void 0, void 0, function* () {
        const content = yield screenContent(Case.pascal(name), targetDir);
        util.writeFile(targetDir, `${Case.snake(name)}_screen.dart`, content);
    });
}
exports.createScreenFromTemplate = createScreenFromTemplate;
function screenContent(name, targetDir) {
    return __awaiter(this, void 0, void 0, function* () {
        const projectName = yield util.readPubspecYamlProperty('name');
        const cubitImport = `import 'package:${projectName}/${targetDir.split('/lib/')[1]}/${Case.snake(name)}_cubit.dart';`;
        const stateImport = `import 'package:${projectName}/${targetDir.split('/lib/')[1]}/${Case.snake(name)}_state.dart';`;
        return `import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
${cubitImport}
${stateImport}

class ${name}Screen extends StatefulWidget {
	const ${name}Screen({Key? key}) : super(key: key);
	
	@override
	_${name}ScreenState createState() => _${name}ScreenState();
}
	
class _${name}ScreenState extends State<${name}Screen> {
	final screenCubit = ${name}Cubit();
	
	@override
	void initState() {
		screenCubit.loadInitialData();
		super.initState();
	}
	
	@override
	Widget build(BuildContext context) {
		return Scaffold(
			body: BlocConsumer<${name}Cubit, ${name}State>(
				bloc: screenCubit,
				listener: (BuildContext context, ${name}State state) {
					if (state.error != null) {
						// TODO your code here
					}
				},
				builder: (BuildContext context, ${name}State state) {
					if (state.isLoading) {
						return Center(child: CircularProgressIndicator());
					}
	
					return buildBody(state);
				},
			),
		);
	}
	
	Widget buildBody(${name}State state) {
		return ListView(
			children: [
				// TODO your code here
			],
		);
	}
}
`;
    });
}
//# sourceMappingURL=screen_template.js.map