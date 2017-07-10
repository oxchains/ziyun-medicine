package main

import (
	//"errors"
	//"time"
	"bytes"
	"encoding/json"
	"fmt"
	"strconv"
	//"strings"

	"github.com/hyperledger/fabric/core/chaincode/shim"
	pb "github.com/hyperledger/fabric/protos/peer"
)

var sp = "*&!"

type myChaincode struct {
}

//the struct of th e sensor
type Sensor struct {
	id              string
	SensorNumber    string
	SensorType      string
	EquipmentNumber string
	EquipmentType   string
	Time            int64
	Temperature     []float32
	Humidity        []float32
	GPSLongitude    float32
	GPSLatitude     float32
	Address         string
	token           string
}

//the struct of the transfer
type ConsignorInfo struct {
	CountrySubdivisionCode   string
	PersonalIdentityDocument string
	Consignor                string
}
type ConsigneeInfo struct {
	CountrySubdivisionCode string
	Consignee              string
	GoodsReceiptPlace      string
}

type PriceInfo struct {
	TotalMonetaryAmount float32
	Remark              string
}

type GoodsInfo struct {
	DescriptionOfGoods          string
	CargoTypeClassificationCode string
	GoodsItemGrossWeight        float32
	Cube                        float32
	TotalNumberOfPackages       int
}

type Driver struct {
	QualificationCertificateNumber string
	NameOfPerson                   string
	TelephoneNumber                string
}

type VehicleInfo struct {
	RoadTransportCertificateNumber string
	PermitNumber                   string
	VehicleNumber                  string
	TrailerVehiclePlateNumber      string
	VehicleClassificationCode      string
	LicensePlateTypeCode           string
	VehicleTonnage                 float32
	Owner                          string
	GoodsInfoList                  []GoodsInfo
	DriverList                     []Driver
}

type LogisticsTrace struct {
	TraceName string
	TraceTime int64
}

type GoodsTrace struct {
	UniqueID        string
	CommodityCode   string
	ProductionBatch string
}

type TransportBill struct {
	id                            string
	PermitNumber                  string
	UnifiedSocialCreditIdentifier string
	Carrier                       string
	BusinessTypeCode              string
	OriginalDocumentNumber        string
	ShippingNoteNumber            string
	ConsignmentDateTime           int64
	DespatchActualDateTime        int64
	GoodsReceiptDateTime          int64
	FreeText                      string
	ConsignorInfo                 ConsignorInfo
	ConsigneeInfo                 ConsigneeInfo
	PriceInfo                     PriceInfo
	VehicleInfo                   VehicleInfo
	LogisticsTraceList            []LogisticsTrace
	GoodsTraceList                []GoodsTrace
}

//the struct of StorageBill
type StorageBill struct {
	id             string
	StorageTitle   string
	WarehouseName  string
	SalesId        string
	TransportId    string
	GiveNmae       string
	GiverPhone     string
	RecipientName  string
	StartTime      int64
	EndTime        int64
	StorageAddress string
	HandoverInfo   string
}

//the struct of the product
type Product struct {
	ProductName        string
	EnterpriseId       string
	ProductOriginalUrl string
	ProductAddress     string
	ProductTime        int64
	ProductType        string
	ProductDeadline    int
	ProductTags        string
	ProductWeight      string
	ProductVolume      string
	ProductCode        string
	Remarks            string
	Size               string
	Pack               string
	ApprovalNumber     string
	Storage            string
	Describe           string
}

//the struct of the ProduceInfo
type ProduceInfo struct {
	id                      string
	ProductionProcessName   string
	GoodsCount              int64
	LastCount               int64
	ProductId               string
	EnterpriseId            string
	ProductionTime          int64
	InStorageTime           int64
	OutStorageTime          int64
	EnvironmentalMonitoring string
	ProductionParameters    string
	QualitySafety           string
	BatchNumber             string
	CheckDate               int64
	CheckWay                string
	CheckResult             string
	InspectorName           string
}

//the struct of the Goods
type DrugInforrmation struct {
	DrugName            string
	ApprovalNumber      string
	Size                string
	Form                string
	NDCNumber           string
	NDCNumberRemark     string
	MedicineInstruction string
}

type FoodInformation struct {
	FoodName     string
	Manufacturer string
}

type ProduceInformation struct {
	Address         string
	ProductionBatch string
	ProductionTime  int64
	ValidDate       int64
}

type Goods struct {
	id                 string
	GoodsType          string
	ParentCode         string
	ProduceInfoId      string
	ProductId          string
	ProductCode        string
	UniqueCode         string
	CommodityCode      string
	ProductionBatch    string
	DrugInforrmation   DrugInforrmation
	FoodInformation    FoodInformation
	ProduceInformation ProduceInformation
}

//the struct of PruchaseInfor
type PurchaseInfo struct {
	id                      string
	PurchaseTitle           string
	Count                   int
	TransportId             string
	EnterpriseId            string
	ProductionAddress       string
	GoodsId                 string
	ProductionSpecification string
	ProductionTime          int64
	ProductionBatch         string
	ExpirationDate          int64
	StockDate               int64
	SupperName              string
	SupperAddress           string
	SupplyName              string
	SupplyPhone             string
}

//the struct of SaleInfo
type SaleInfo struct {
	id                          string
	No                          string
	SalesTitle                  string
	PurchaseId                  string
	ProductAddress              string
	ProductionName              string
	ProductionSpecification     string
	CreateSalesEnterpriseId     string
	TranstitSalesEnterpriseId   string
	SalesCount                  int64
	ProductTime                 int64
	ProductBatch                string
	ProductDeadline             int
	GoodsOriginalUrl            string
	SalesDate                   int64
	BuyerName                   string
	BuyerAddress                string
	BuyerTel                    string
	ResponsibilityName          string
	InspectionCertificateNumber string
	ProductionProcessId         string
	GoodsId                     string
	SalsesId                    string
}

// ============================================================================================================================
// Main
// ============================================================================================================================
func main() {
	err := shim.Start(new(myChaincode))
	if err != nil {
		fmt.Printf("Error starting Simple chaincode: %s", err)
	}
}

// Init resets all the things
func (t *myChaincode) Init(stub shim.ChaincodeStubInterface) pb.Response {

	items := []string{"sensor", "storagebill", "product", "produceinfo", "goods", "pruchaseinfo", "saleinfo"}

	for _, item := range items {
		err := stub.PutState(item, []byte("0"))
		if err != nil {
			return shim.Error("init failed while puting " + item + " into state")
		}
	}

	return shim.Success(nil)
}

// Invoke is our entry point to invoke a chaincode function
func (t *myChaincode) Invoke(stub shim.ChaincodeStubInterface) pb.Response {
	function, args := stub.GetFunctionAndParameters()
	switch function {

	case "saveSensorData":
		return t.saveSensorData(stub, args)

	case "getSensorDataBySensorNum":
		return t.getSensorDataBySensorNum(stub, args)

	case "getSensorDataByEquipmentNum":
		return t.getSensorDataByEquipmentNum(stub, args)

	case "getNumberOfSensorDataByTime":
		return t.getNumberOfSensorDataByTime(stub, args)

	case "saveTransportBill", "saveStorageBill", "saveProduct", "saveProduceInfo", "saveGoods", "savePurchaseInfo", "saveSaleInfo":
		return t.saveData(stub, function, args)

	case "searchByQuery":
		return t.searchByQuery(stub, args)

	default:
		return shim.Error("Unsupported operation")
	}
}

func (t *myChaincode) searchByQuery(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	if len(args) < 1 {
		return shim.Error("searchByQuery operation must have 1 ars")
	}
	queryString := args[0]

	queryResults, err := getQueryResultsForQueryString(stub, queryString)
	if err != nil {
		return shim.Error(err.Error())
	}
	return shim.Success(queryResults)

}

// =========================================================================================
// getQueryResultsForQueryString executes the passed in query string.
// Result set is built and returned as a byte array containing the JSON results.
// This function return the list of the data with josn format.
// =========================================================================================
func getQueryResultsForQueryString(stub shim.ChaincodeStubInterface, queryString string) ([]byte, error) {

	fmt.Printf("getQueryResultsForQueryString queryString:\n%s\n", queryString)

	resultsIterator, err := stub.GetQueryResult(queryString)
	if err != nil {
		return nil, err
	}
	defer resultsIterator.Close()

	// buffer is a JSON array containing QueryRecords
	var buffer bytes.Buffer
	buffer.WriteString("{\"list\":[")

	bArrayMemberAlreadyWritten := false
	for resultsIterator.HasNext() {
		queryResponse, err := resultsIterator.Next()
		if err != nil {
			return nil, err
		}
		// Add a comma before array members, suppress it for the first array member
		if bArrayMemberAlreadyWritten == true {
			buffer.WriteString(",")
		}
		// Record is a JSON object, so we write as-is
		buffer.WriteString(string(queryResponse.Value))
		bArrayMemberAlreadyWritten = true
	}
	buffer.WriteString("]}")

	fmt.Printf("getQueryResultsForQueryString queryResult:\n%s\n", buffer.String())

	return buffer.Bytes(), nil
}

// =========================================================================================
// getQueryResultForQueryString executes the passed in query string.
// Result set is built and returned as a byte array containing the JSON results.
// This function only return ONE value with json format.
// =========================================================================================
func getQueryResultForQueryString(stub shim.ChaincodeStubInterface, queryString string) ([]byte, error) {

	fmt.Printf("getQueryResultForQueryString queryString:\n%s\n", queryString)

	resultsIterator, err := stub.GetQueryResult(queryString)
	if err != nil {
		return nil, err
	}
	defer resultsIterator.Close()

	// buffer is a JSON array containing QueryRecords
	var ret []byte

	for resultsIterator.HasNext() {
		queryResponse, err := resultsIterator.Next()
		if err != nil {
			return nil, err
		}
		ret = queryResponse.Value
		break
	}

	fmt.Printf("getQueryResultForQueryString queryResult:\n%s\n", string(ret))

	return ret, nil
}

func getNumOfQueryResultsForQueryString(stub shim.ChaincodeStubInterface, queryString string) ([]byte, error) {

	fmt.Printf("getQueryResultForQueryString queryString:\n%s\n", queryString)

	resultsIterator, err := stub.GetQueryResult(queryString)
	if err != nil {
		return nil, err
	}
	defer resultsIterator.Close()

	ret := 0

	// buffer is a JSON array containing QueryRecords

	for resultsIterator.HasNext() {
		_, err := resultsIterator.Next()
		if err != nil {
			return nil, err
		}
		ret = ret + 1
	}

	fmt.Printf("getNumOfQueryResultsForQueryString queryResult:\n%d\n", ret)

	return []byte(strconv.Itoa(ret)), nil
}

//to get a uuid for data
func getUuid(stub shim.ChaincodeStubInterface, item string) (string, error) {
	value, err := stub.GetState(item)
	if err != nil {
		return "nil", err
	}
	ret := item + string(value)
	in64, err := strconv.ParseInt(string(value), 10, 64)
	if err != nil {
		return "nil", err
	}
	in64 = in64 + 1
	strin := strconv.FormatInt(in64, 10)
	err = stub.PutState(item, []byte(strin))
	if err != nil {
		return "nil", err
	}
	return ret, nil
}

func (t *myChaincode) saveSensorData(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	if len(args) < 1 {
		return shim.Error("saveSensorData operation must have 1 arg")
	}

	// get hte args
	bSensor := []byte(args[0])
	//get the info
	sensor := &Sensor{}
	err := json.Unmarshal(bSensor, &sensor)
	bSensor, err = json.Marshal(sensor)
	if err != nil {
		return shim.Error("Unmarshal failed")
	}
	tm := sensor.Time
	sTm := strconv.FormatInt(tm, 10)
	eqmtNum := sensor.EquipmentNumber
	if sTm == "" {
		return shim.Error("bad format of the time")
	}
	if eqmtNum == "" {
		return shim.Error("bad format of the eqmtNum")
	}
	//save the json data
	//1. get the uuid
	uuid, err := getUuid(stub, "sensor")
	if err != nil {
		return shim.Error("err while geting uuid for sensor data")
	}
	err = stub.PutState(uuid, bSensor)
	if err != nil {
		return shim.Error("err while putting the sensor data")
	}
	return shim.Success(nil)
}

func (t *myChaincode) getSensorDataBySensorNum(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	if len(args) < 3 {
		return shim.Error("getSensorDataBySensorNum operation must have 3 args: sensorNumber, startTime and endTime (limit and skip is optional)")
	}
	//get the args
	sensorNum := args[0]
	startTime := args[1]
	endTime := args[2]
	limit := 10
	skip := 0
	var err error
	if len(args) >= 4 {
		tmp := args[3]
		limit, err = strconv.Atoi(tmp)
		if err != nil {
			return shim.Error("err while processing the limit arg")
		}
	}
	if len(args) >= 5 {
		tmp := args[4]
		skip, err = strconv.Atoi(tmp)
		if err != nil {
			return shim.Error("err while processing the skip arg")
		}
	}
	//fix? do some check for the time????
	intStartTime, err := strconv.ParseInt(startTime, 10, 64)
	if err != nil {
		return shim.Error("err while processing the startTime")
	}
	intEndTime, err := strconv.ParseInt(endTime, 10, 64)
	if err != nil {
		return shim.Error("err while processing the endTime")
	}
	if intEndTime < intStartTime {
		return shim.Error("the endTime must be larger than startTime")
	}
	queryString := fmt.Sprintf("{\"selector\":{\"$and\": [{\"SensorNumber\": \"%s\"}, {\"Time\": {\"$and\": [{\"$gte\": %d},{\"$lte\": %d}]}}]}, \"sort\": [{\"Time\": \"asc\"}], \"limit\": %d, \"skip\": %d }", sensorNum, intStartTime, intEndTime, limit, skip)

	queryResults, err := getQueryResultsForQueryString(stub, queryString)
	if err != nil {
		return shim.Error(err.Error())
	}

	return shim.Success(queryResults)

}

func (t *myChaincode) getSensorDataByEquipmentNum(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	if len(args) < 3 {
		return shim.Error("getSensorDataBySensorNum operation must have 3 args: EquipmentNum, startTime and endTime")
	}
	//get the args
	equipmentNum := args[0]
	startTime := args[1]
	endTime := args[2]
	limit := 10
	skip := 0
	var err error
	if len(args) >= 4 {
		tmp := args[3]
		limit, err = strconv.Atoi(tmp)
		if err != nil {
			return shim.Error("err while processing the limit arg")
		}
	}
	if len(args) >= 5 {
		tmp := args[4]
		skip, err = strconv.Atoi(tmp)
		if err != nil {
			return shim.Error("err while processing the skip arg")
		}
	}
	//fix? do some check for the time????
	intStartTime, err := strconv.ParseInt(startTime, 10, 64)
	if err != nil {
		return shim.Error("err while processing the startTime")
	}
	intEndTime, err := strconv.ParseInt(endTime, 10, 64)
	if err != nil {
		return shim.Error("err while processing the endTime")
	}
	if intEndTime < intStartTime {
		return shim.Error("the endTime must be larger than startTime")
	}
	queryString := fmt.Sprintf("{\"selector\":{\"$and\": [{\"EquipmentNumber\": \"%s\"}, {\"Time\": {\"$and\": [{\"$gte\": %d},{\"$lte\": %d}]}}]}, \"sort\": [{\"Time\": \"asc\"}], \"limit\": %d, \"skip\": %d}", equipmentNum, intStartTime, intEndTime, limit, skip)

	queryResults, err := getQueryResultsForQueryString(stub, queryString)
	if err != nil {
		return shim.Error(err.Error())
	}

	return shim.Success(queryResults)
}

func (t *myChaincode) getNumberOfSensorDataByTime(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	if len(args) < 2 {
		return shim.Error("getSensorDataBySensorNum operation must have 2 args:startTime and endTime")
	}
	//get the args
	startTime := args[0]
	endTime := args[1]
	//fix? do some check for the time????
	intStartTime, err := strconv.ParseInt(startTime, 10, 64)
	if err != nil {
		return shim.Error("err while processing the startTime")
	}
	intEndTime, err := strconv.ParseInt(endTime, 10, 64)
	if err != nil {
		return shim.Error("err while processing the endTime")
	}
	if intEndTime < intStartTime {
		return shim.Error("the endTime must be larger than startTime")
	}

	//set the maximum number of docs
	limit := 10000
	skip := 0

	queryString := fmt.Sprintf("{\"selector\":{\"Time\": {\"$and\": [{\"$gte\": %d},{\"$lte\": %d}]}}, \"sort\": [{\"Time\": \"asc\"}], \"limit\": %d, \"skip\": %d}", intStartTime, intEndTime, limit, skip)

	queryResults, err := getNumOfQueryResultsForQueryString(stub, queryString)
	if err != nil {
		return shim.Error(err.Error())
	}

	return shim.Success(queryResults)
}

//data for all the data except sensor
func (t *myChaincode) saveData(stub shim.ChaincodeStubInterface, function string, args []string) pb.Response {
	if len(args) < 1 {
		return shim.Error(function + " operation must have 1 arg")
	}

	// get hte args
	bdata := []byte(args[0])
	//get the info
	var data interface{}
	var item string
	switch function {

	case "saveTransportBill":
		data = &TransportBill{}
		item = "transportbill"

	case "saveStorageBill":
		data = &StorageBill{}
		item = "storagebill"

	case "saveProduct":
		data = &Product{}
		item = "product"

	case "saveProduceInfo":
		data = &ProduceInfo{}
		item = "produceinfo"

	case "saveGoods":
		data = &Goods{}
		item = "goods"

	case "savePurchaseInfo":
		data = &PurchaseInfo{}
		item = "purchaseinfo"

	case "saveSaleInfo":
		data = &SaleInfo{}
		item = "saleinfo"

	default:
		return shim.Error(function + "opration is unsupported")
	}

	err := json.Unmarshal(bdata, &data)
	bdata, err = json.Marshal(data)
	if err != nil {
		return shim.Error("Unmarshal failed")
	}
	//save the json data
	//1. get the uuid
	uuid, err := getUuid(stub, item)
	if err != nil {
		return shim.Error("err while geting uuid for sensor data")
	}
	err = stub.PutState(uuid, bdata)
	if err != nil {
		return shim.Error("err while putting the sensor data")
	}
	return shim.Success(nil)
}
