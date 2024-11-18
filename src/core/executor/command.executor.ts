import { ChildProcessWithoutNullStreams } from 'child_process';
import { IStreamLogger } from '../handlers/stream-logger.interface';
import { ICommangExec } from './command.types';

export abstract class CommandExecutor<Input> {
	constructor(private logger: IStreamLogger) {
		
	}

	public async execute() {
		const input = await this.prompt();
		const command = this.build(input);
		const stream = this.spown(command);
		this.processStream(stream, this.logger)
	}

	protected abstract prompt(): Promise<Input>;
	protected abstract build(input: Input): ICommangExec;
	protected abstract spown(command:ICommangExec): ChildProcessWithoutNullStreams;
	protected abstract processStream(stream: ChildProcessWithoutNullStreams, logger: IStreamLogger): void;	
}

