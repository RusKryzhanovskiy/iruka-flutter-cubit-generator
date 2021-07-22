import * as util from '../utils/utils';
import Case = require('case');

export async function createStateFromTemplate(name: string, targetDir: string) {
    util.writeFile(targetDir, `${Case.snake(name)}_state.dart`, stateContent(Case.pascal(name)));
}

function stateContent(name: String): string {
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