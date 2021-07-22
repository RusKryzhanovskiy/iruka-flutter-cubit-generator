import * as util from '../utils/utils';
import Case = require('case');

export async function createCubitFromTemplate(name: string, targetDir: string) {
	const content = await cubitContent(Case.pascal(name), targetDir);
	util.writeFile(targetDir, `${Case.snake(name)}_cubit.dart`, content);
}

async function cubitContent(name: string, targetDirectory: string): Promise<string> {
	const projectName = await util.readPubspecYamlProperty('name');

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
}