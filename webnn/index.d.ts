interface NavigatorML {
    readonly ml: ML;
}
interface Navigator extends NavigatorML {
}
interface WorkerNavigator extends NavigatorML {
}
type MLDeviceType = "cpu" | "gpu" | "npu";
type MLPowerPreference = "default" | "high-performance" | "low-power";
interface MLContextOptions {
    deviceType?: MLDeviceType;
    powerPreference?: MLPowerPreference;
}
interface ML {
    createContext(options?: MLContextOptions): Promise<MLContext>;
    createContext(gpuDevice: GPUDevice): Promise<MLContext>;
}
type MLNamedArrayBufferViews = Record<string, ArrayBufferView>;
interface MLComputeResult {
    inputs?: MLNamedArrayBufferViews;
    outputs?: MLNamedArrayBufferViews;
}
interface MLContext {
    compute(graph: MLGraph, inputs: MLNamedArrayBufferViews, outputs: MLNamedArrayBufferViews): Promise<MLComputeResult>;
}
interface MLGraph {
}
type MLInputOperandLayout = "nchw" | "nhwc";
type MLOperandDataType = "float32" | "float16" | "int32" | "uint32" | "int64" | "uint64" | "int8" | "uint8";
interface MLOperandDescriptor {
    dataType: MLOperandDataType;
    dimensions?: Array<number>;
}
interface MLOperand {
    dataType(): MLOperandDataType;
    shape(): Array<number>;
}
interface MLActivation {
}
type MLNamedOperands = Record<string, MLOperand>;
interface MLGraphBuilder {
    new (context: MLContext): MLGraphBuilder;
    input(name: string, descriptor: MLOperandDescriptor): MLOperand;
    constant(descriptor: MLOperandDescriptor, bufferView: ArrayBufferView): MLOperand;
    constant(value: number, type?: MLOperandDataType): MLOperand;
    build(outputs: MLNamedOperands): Promise<MLGraph>;
}
interface MLArgMinMaxOptions {
    axes?: Array<number>;
    keepDimensions?: boolean;
    selectLastIndex?: boolean;
}
interface MLGraphBuilder {
    argMin(input: MLOperand, options?: MLArgMinMaxOptions): MLOperand;
    argMax(input: MLOperand, options?: MLArgMinMaxOptions): MLOperand;
}
interface MLBatchNormalizationOptions {
    scale?: MLOperand;
    bias?: MLOperand;
    axis?: number;
    epsilon?: number;
    activation?: MLActivation;
}
interface MLGraphBuilder {
    batchNormalization(input: MLOperand, mean: MLOperand, variance: MLOperand, options?: MLBatchNormalizationOptions): MLOperand;
}
interface MLGraphBuilder {
    cast(input: MLOperand, type: MLOperandDataType): MLOperand;
}
interface MLClampOptions {
    minValue?: number;
    maxValue?: number;
}
interface MLGraphBuilder {
    clamp(input: MLOperand, options?: MLClampOptions): MLOperand;
    clamp(options?: MLClampOptions): MLActivation;
}
interface MLGraphBuilder {
    concat(inputs: Array<MLOperand>, axis: number): MLOperand;
}
type MLConv2dFilterOperandLayout = "oihw" | "hwio" | "ohwi" | "ihwo";
interface MLConv2dOptions {
    padding?: Array<number>;
    strides?: Array<number>;
    dilations?: Array<number>;
    groups?: number;
    inputLayout?: MLInputOperandLayout;
    filterLayout?: MLConv2dFilterOperandLayout;
    bias?: MLOperand;
    activation?: MLActivation;
}
interface MLGraphBuilder {
    conv2d(input: MLOperand, filter: MLOperand, options?: MLConv2dOptions): MLOperand;
}
type MLConvTranspose2dFilterOperandLayout = "iohw" | "hwoi" | "ohwi";
interface MLConvTranspose2dOptions {
    padding?: Array<number>;
    strides?: Array<number>;
    dilations?: Array<number>;
    outputPadding?: Array<number>;
    outputSizes?: Array<number>;
    groups?: number;
    inputLayout?: MLInputOperandLayout;
    filterLayout?: MLConvTranspose2dFilterOperandLayout;
    bias?: MLOperand;
    activation?: MLActivation;
}
interface MLGraphBuilder {
    convTranspose2d(input: MLOperand, filter: MLOperand, options?: MLConvTranspose2dOptions): MLOperand;
}
interface MLGraphBuilder {
    add(a: MLOperand, b: MLOperand): MLOperand;
    sub(a: MLOperand, b: MLOperand): MLOperand;
    mul(a: MLOperand, b: MLOperand): MLOperand;
    div(a: MLOperand, b: MLOperand): MLOperand;
    max(a: MLOperand, b: MLOperand): MLOperand;
    min(a: MLOperand, b: MLOperand): MLOperand;
    pow(a: MLOperand, b: MLOperand): MLOperand;
}
interface MLGraphBuilder {
    equal(a: MLOperand, b: MLOperand): MLOperand;
    greater(a: MLOperand, b: MLOperand): MLOperand;
    greaterOrEqual(a: MLOperand, b: MLOperand): MLOperand;
    lesser(a: MLOperand, b: MLOperand): MLOperand;
    lesserOrEqual(a: MLOperand, b: MLOperand): MLOperand;
    not(a: MLOperand): MLOperand;
}
interface MLGraphBuilder {
    abs(input: MLOperand): MLOperand;
    ceil(input: MLOperand): MLOperand;
    cos(input: MLOperand): MLOperand;
    erf(input: MLOperand): MLOperand;
    exp(input: MLOperand): MLOperand;
    floor(input: MLOperand): MLOperand;
    identity(input: MLOperand): MLOperand;
    log(input: MLOperand): MLOperand;
    neg(input: MLOperand): MLOperand;
    reciprocal(input: MLOperand): MLOperand;
    sin(input: MLOperand): MLOperand;
    sqrt(input: MLOperand): MLOperand;
    tan(input: MLOperand): MLOperand;
}
interface MLEluOptions {
    alpha?: number;
}
interface MLGraphBuilder {
    elu(input: MLOperand, options?: MLEluOptions): MLOperand;
    elu(options?: MLEluOptions): MLActivation;
}
interface MLGraphBuilder {
    expand(input: MLOperand, newShape: Array<number>): MLOperand;
}
interface MLGatherOptions {
    axis?: number;
}
interface MLGraphBuilder {
    gather(input: MLOperand, indices: MLOperand, options?: MLGatherOptions): MLOperand;
}
interface MLGraphBuilder {
    gelu(input: MLOperand): MLOperand;
    gelu(): MLActivation;
}
interface MLGemmOptions {
    c?: MLOperand;
    alpha?: number;
    beta?: number;
    aTranspose?: boolean;
    bTranspose?: boolean;
}
interface MLGraphBuilder {
    gemm(a: MLOperand, b: MLOperand, options?: MLGemmOptions): MLOperand;
}
type MLGruWeightLayout = "zrn" | "rzn";
type MLRecurrentNetworkDirection = "forward" | "backward" | "both";
interface MLGruOptions {
    bias?: MLOperand;
    recurrentBias?: MLOperand;
    initialHiddenState?: MLOperand;
    resetAfter?: boolean;
    returnSequence?: boolean;
    direction?: MLRecurrentNetworkDirection;
    layout?: MLGruWeightLayout;
    activations?: Array<MLActivation>;
}
interface MLGraphBuilder {
    gru(input: MLOperand, weight: MLOperand, recurrentWeight: MLOperand, steps: number, hiddenSize: number, options?: MLGruOptions): Array<MLOperand>;
}
interface MLGruCellOptions {
    bias?: MLOperand;
    recurrentBias?: MLOperand;
    resetAfter?: boolean;
    layout?: MLGruWeightLayout;
    activations?: Array<MLActivation>;
}
interface MLGraphBuilder {
    gruCell(input: MLOperand, weight: MLOperand, recurrentWeight: MLOperand, hiddenState: MLOperand, hiddenSize: number, options?: MLGruCellOptions): MLOperand;
}
interface MLHardSigmoidOptions {
    alpha?: number;
    beta?: number;
}
interface MLGraphBuilder {
    hardSigmoid(input: MLOperand, options?: MLHardSigmoidOptions): MLOperand;
    hardSigmoid(options?: MLHardSigmoidOptions): MLActivation;
}
interface MLGraphBuilder {
    hardSwish(input: MLOperand): MLOperand;
    hardSwish(): MLActivation;
}
interface MLInstanceNormalizationOptions {
    scale?: MLOperand;
    bias?: MLOperand;
    epsilon?: number;
    layout?: MLInputOperandLayout;
}
interface MLGraphBuilder {
    instanceNormalization(input: MLOperand, options?: MLInstanceNormalizationOptions): MLOperand;
}
interface MLLayerNormalizationOptions {
    scale?: MLOperand;
    bias?: MLOperand;
    axes?: Array<number>;
    epsilon?: number;
}
interface MLGraphBuilder {
    layerNormalization(input: MLOperand, options?: MLLayerNormalizationOptions): MLOperand;
}
interface MLLeakyReluOptions {
    alpha?: number;
}
interface MLGraphBuilder {
    leakyRelu(input: MLOperand, options?: MLLeakyReluOptions): MLOperand;
    leakyRelu(options?: MLLeakyReluOptions): MLActivation;
}
interface MLLinearOptions {
    alpha?: number;
    beta?: number;
}
interface MLGraphBuilder {
    linear(input: MLOperand, options?: MLLinearOptions): MLOperand;
    linear(options?: MLLinearOptions): MLActivation;
}
type MLLstmWeightLayout = "iofg" | "ifgo";
interface MLLstmOptions {
    bias?: MLOperand;
    recurrentBias?: MLOperand;
    peepholeWeight?: MLOperand;
    initialHiddenState?: MLOperand;
    initialCellState?: MLOperand;
    returnSequence?: boolean;
    direction?: MLRecurrentNetworkDirection;
    layout?: MLLstmWeightLayout;
    activations?: Array<MLActivation>;
}
interface MLGraphBuilder {
    lstm(input: MLOperand, weight: MLOperand, recurrentWeight: MLOperand, steps: number, hiddenSize: number, options?: MLLstmOptions): Array<MLOperand>;
}
interface MLLstmCellOptions {
    bias?: MLOperand;
    recurrentBias?: MLOperand;
    peepholeWeight?: MLOperand;
    layout?: MLLstmWeightLayout;
    activations?: Array<MLActivation>;
}
interface MLGraphBuilder {
    lstmCell(input: MLOperand, weight: MLOperand, recurrentWeight: MLOperand, hiddenState: MLOperand, cellState: MLOperand, hiddenSize: number, options?: MLLstmCellOptions): Array<MLOperand>;
}
interface MLGraphBuilder {
    matmul(a: MLOperand, b: MLOperand): MLOperand;
}
type MLPaddingMode = "constant" | "edge" | "reflection" | "symmetric";
interface MLPadOptions {
    mode?: MLPaddingMode;
    value?: number;
}
interface MLGraphBuilder {
    pad(input: MLOperand, beginningPadding: Array<number>, endingPadding: Array<number>, options?: MLPadOptions): MLOperand;
}
type MLRoundingType = "floor" | "ceil";
interface MLPool2dOptions {
    windowDimensions?: Array<number>;
    padding?: Array<number>;
    strides?: Array<number>;
    dilations?: Array<number>;
    layout?: MLInputOperandLayout;
    roundingType?: MLRoundingType;
    outputSizes?: Array<number>;
}
interface MLGraphBuilder {
    averagePool2d(input: MLOperand, options?: MLPool2dOptions): MLOperand;
    l2Pool2d(input: MLOperand, options?: MLPool2dOptions): MLOperand;
    maxPool2d(input: MLOperand, options?: MLPool2dOptions): MLOperand;
}
interface MLGraphBuilder {
    prelu(input: MLOperand, slope: MLOperand): MLOperand;
}
interface MLReduceOptions {
    axes?: Array<number>;
    keepDimensions?: boolean;
}
interface MLGraphBuilder {
    reduceL1(input: MLOperand, options?: MLReduceOptions): MLOperand;
    reduceL2(input: MLOperand, options?: MLReduceOptions): MLOperand;
    reduceLogSum(input: MLOperand, options?: MLReduceOptions): MLOperand;
    reduceLogSumExp(input: MLOperand, options?: MLReduceOptions): MLOperand;
    reduceMax(input: MLOperand, options?: MLReduceOptions): MLOperand;
    reduceMean(input: MLOperand, options?: MLReduceOptions): MLOperand;
    reduceMin(input: MLOperand, options?: MLReduceOptions): MLOperand;
    reduceProduct(input: MLOperand, options?: MLReduceOptions): MLOperand;
    reduceSum(input: MLOperand, options?: MLReduceOptions): MLOperand;
    reduceSumSquare(input: MLOperand, options?: MLReduceOptions): MLOperand;
}
interface MLGraphBuilder {
    relu(input: MLOperand): MLOperand;
    relu(): MLActivation;
}
type MLInterpolationMode = "nearest-neighbor" | "linear";
interface MLResample2dOptions {
    mode?: MLInterpolationMode;
    scales?: Array<number>;
    sizes?: Array<number>;
    axes?: Array<number>;
}
interface MLGraphBuilder {
    resample2d(input: MLOperand, options?: MLResample2dOptions): MLOperand;
}
interface MLGraphBuilder {
    reshape(input: MLOperand, newShape: Array<number>): MLOperand;
}
interface MLGraphBuilder {
    sigmoid(input: MLOperand): MLOperand;
    sigmoid(): MLActivation;
}
interface MLGraphBuilder {
    slice(input: MLOperand, starts: Array<number>, sizes: Array<number>): MLOperand;
}
interface MLGraphBuilder {
    softmax(input: MLOperand, axis: number): MLOperand;
    softmax(axis: number): MLActivation;
}
interface MLGraphBuilder {
    softplus(input: MLOperand): MLOperand;
    softplus(): MLActivation;
}
interface MLGraphBuilder {
    softsign(input: MLOperand): MLOperand;
    softsign(): MLActivation;
}
interface MLSplitOptions {
    axis?: number;
}
interface MLGraphBuilder {
    split(input: MLOperand, splits: number | Array<number>, options?: MLSplitOptions): Array<MLOperand>;
}
interface MLGraphBuilder {
    tanh(input: MLOperand): MLOperand;
    tanh(): MLActivation;
}
interface MLTransposeOptions {
    permutation?: Array<number>;
}
interface MLGraphBuilder {
    transpose(input: MLOperand, options?: MLTransposeOptions): MLOperand;
}
interface MLTriangularOptions {
    upper?: boolean;
    diagonal?: number;
}
interface MLGraphBuilder {
    triangular(input: MLOperand, options?: MLTriangularOptions): MLOperand;
}
interface MLGraphBuilder {
    where(condition: MLOperand, input: MLOperand, other: MLOperand): MLOperand;
}

// Experimental MLBuffer interface

type MLSize64Out = number;
interface MLBuffer {
    readonly size: MLSize64Out;
    destroy(): void;
}
type MLSize64 = number;
interface MLBufferDescriptor {
    size: MLSize64;
}
type MLNamedBuffers = Record<string, MLBuffer>;
interface MLContext {
    createBuffer(descriptor: MLBufferDescriptor): MLBuffer;
    writeBuffer(dstBuffer: MLBuffer, srcData: ArrayBufferView | ArrayBuffer, srcElementOffset?: MLSize64, srcElementSize?: MLSize64): void;
    readBuffer(srcBuffer: MLBuffer): Promise<ArrayBuffer>;
    dispatch(graph: MLGraph, inputs: MLNamedBuffers, outputs: MLNamedBuffers): void;
}
