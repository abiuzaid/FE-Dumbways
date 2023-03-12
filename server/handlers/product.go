package handlers

import (
	productsdto "backEnd/dto/products"
	dto "backEnd/dto/result"
	"backEnd/models"
	"fmt"
	"strconv"

	"backEnd/repositories"
	"net/http"

	"github.com/labstack/echo/v4"
)

type handlerProduct struct {
	ProductRepository repositories.ProductRepository
}

func HandleProduct(ProductRepository repositories.ProductRepository) *handlerProduct {
	return &handlerProduct{ProductRepository}
}

func (h *handlerProduct) GetProduct(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	product, err := h.ProductRepository.GetProduct(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: convertProduct(product)})
}

func (h *handlerProduct) FindProduct(c echo.Context) error {
	product, err := h.ProductRepository.FindProduct()
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: product})
}

func (h *handlerProduct) CreateProduct(c echo.Context) error {
	request := new(productsdto.CreateProductRequset)
	if err := c.Bind(request); err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	dataFile := c.Get("dataFile").(string)
	fmt.Println("this is data file", dataFile)

	price, _ := strconv.Atoi(c.FormValue("price"))
	qty, _ := strconv.Atoi(c.FormValue("stock"))
	// category_id, _ := strconv.Atoi(c.FormValue("category_id"))

	product := models.Product{
		Name:        c.FormValue("name"),
		Price:       price,
		Description: c.FormValue("description"),
		Stock:       qty,
		Photo:       dataFile,
	}

	data, err := h.ProductRepository.CreateProduct(product)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})

	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: convertProduct(data)})

}

func (h *handlerProduct) DeleteProduct(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	product, err := h.ProductRepository.GetProduct(id)

	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}
	data, err := h.ProductRepository.DeleteProduct(product)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}
	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: convertProduct(data)})
}

func (h *handlerProduct) UpdateProduct(C echo.Context) error {

	dataFile := C.Get("dataFile").(string)
	fmt.Println("this is data file", dataFile)

	price, _ := strconv.Atoi(C.FormValue("price"))
	qty, _ := strconv.Atoi(C.FormValue("stock"))

	request := productsdto.CreateProductRequset{
		Name:        C.FormValue("name"),
		Price:       price,
		Description: C.FormValue("description"),
		Stock:       qty,
		Photo:       dataFile,
	}

	id, _ := strconv.Atoi(C.Param("id"))
	product, err := h.ProductRepository.GetProduct(id)

	if err != nil {
		return C.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	if request.Name != "" {
		product.Name = request.Name
	}
	if request.Price != 0 {
		product.Price = request.Price
	}
	if request.Description != "" {
		product.Description = request.Description
	}
	if request.Stock != 0 {
		product.Stock = request.Stock
	}
	if request.Photo != "" {
		product.Photo = request.Photo
	}

	product, err = h.ProductRepository.UpdateProduct(product)
	if err != nil {
		return C.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}
	product, _ = h.ProductRepository.GetProduct(product.ID)
	return C.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: convertProduct(product)})

}

func convertProduct(u models.Product) productsdto.ProductResponse {
	return productsdto.ProductResponse{
		Name:        u.Name,
		Description: u.Description,
		Price:       u.Price,
		Stock:       u.Stock,
		Photo:       u.Photo,
	}
}
