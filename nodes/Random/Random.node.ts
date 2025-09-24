import {
    IExecuteFunctions,
    INodeExecutionData,
    INodeType,
    INodeTypeDescription,
    NodeOperationError,
} from 'n8n-workflow';

export class Random implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'Random',
        name: 'random',
        icon: 'file:Random.svg',
        group: ['transform'],
        version: 1,
        description: 'Gera um número aleatório usando a API Random.org',
        defaults: {
            name: 'Random Number',
        },
        inputs: [
            {
                displayName: 'Execute',
                type: 'main',
            },
        ],
        outputs: [
            {
                displayName: 'Execute',
                type: 'main',
            },
        ],
        properties: [
            {
                displayName: 'Resource',
                name: 'resource',
                type: 'options',
                noDataExpression: true,
                options: [
                    {
                        name: 'True Random Number Generator',
                        value: 'generate',
                    },
                ],
                default: 'generate',
            },
            {
                displayName: 'Min',
                name: 'min',
                type: 'number',
                default: 1,
                required: true,
                description: 'O valor mínimo do intervalo (inclusivo)',
                displayOptions: {
                    show: {
                        resource: ['generate'],
                    },
                },
            },
            {
                displayName: 'Max',
                name: 'max',
                type: 'number',
                default: 100,
                required: true,
                description: 'O valor máximo do intervalo (inclusivo)',
                displayOptions: {
                    show: {
                        resource: ['generate'],
                    },
                },
            },
        ],
    };

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const returnData: INodeExecutionData[] = [];
        const min = this.getNodeParameter('min', 0) as number;
        const max = this.getNodeParameter('max', 0) as number;

        // VALIDAÇÃO 1: NÚMEROS INTEIROS
        if (!Number.isInteger(min) || !Number.isInteger(max)) {
            throw new NodeOperationError(this.getNode(), 'Os valores de "Min" e "Max" devem ser números inteiros.', {
                itemIndex: 0,
            });
        }

        // VALIDAÇÃO 2: MIN NÃO PODE SER MAIOR QUE MAX
        if (min > max) {
            throw new NodeOperationError(this.getNode(), 'O valor de "Min" não pode ser maior que o valor de "Max".', {
                itemIndex: 0,
            });
        }

        const apiUrl = `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`;

        const response = await this.helpers.httpRequest({
            method: 'GET',
            url: apiUrl,
            json: false,
            encoding: 'text',
        });
        
        // Mostra o resultado retornado da API
        const randomNumber = parseInt(response.trim(), 10);
        
        const generationTimestamp = new Date().toISOString();

        const executionData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray([{ 
               Numero_Aleatorio: randomNumber,
                Gerado_Em: generationTimestamp, 
            }]),
            { itemData: { item: 0 } },
        );

        returnData.push(...executionData);

        return this.prepareOutputData(returnData);
    }
}