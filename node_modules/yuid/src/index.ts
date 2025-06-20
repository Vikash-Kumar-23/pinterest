class Yuid {
	static *generator(): IterableIterator<string> {
		let serial: number = 0;
		let random: string = '';
		let time: string = '';
		while (true) {
			serial++;
			serial = serial % Number.MAX_SAFE_INTEGER;
			random = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(36);
			time = new Date().getTime().toString(36);
			yield `${serial.toString(36)}-${time}-${random}`;
		}
	}

	static getId(): string {
		return this.generator().next().value;
	}
}

export { Yuid };
export default Yuid;
