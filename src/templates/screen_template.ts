import * as util from '../utils/utils';
import Case = require('case');

export async function createScreenFromTemplate(name: string, targetDir: string) {
	const content = await screenContent(Case.pascal(name), targetDir);
	util.writeFile(targetDir, `${Case.snake(name)}_screen.dart`, content);
}

async function screenContent(name: string, targetDir: string): Promise<string> {
	const projectName = await util.readPubspecYamlProperty('name');

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
}