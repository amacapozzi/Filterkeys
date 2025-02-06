package main

import (
	"context"
	"fmt"
	"syscall"
	"unsafe"
)

// App struct
type App struct {
	ctx context.Context
}

const (
	SPI_SETFILTERKEYS  = 0x0033
	SPI_GETFILTERKEYS  = 0x0032
	SPIF_UPDATEINIFILE = 0x01
	SPIF_SENDCHANGE    = 0x02
)

type FilterKeysSettings struct {
	cbSize      uint32
	dwFlags     uint32
	iWaitMSec   uint32
	iDelayMSec  uint32
	iRepeatMSec uint32
	iBounceMSec uint32
}

const (
	FKF_FILTERKEYSON = 0x00000001
)

var (
	user32                   = syscall.NewLazyDLL("user32.dll")
	procSystemParametersInfo = user32.NewProc("SystemParametersInfoW")
)

func NewApp() *App {
	return &App{}
}

func (a *App) SetSettings(wait, delay, repeat, bounce int) error {
	settings := FilterKeysSettings{
		cbSize:      uint32(unsafe.Sizeof(FilterKeysSettings{})),
		dwFlags:     FKF_FILTERKEYSON,
		iWaitMSec:   uint32(wait),
		iDelayMSec:  uint32(delay),
		iRepeatMSec: uint32(repeat),
		iBounceMSec: uint32(bounce),
	}

	ret, _, err := procSystemParametersInfo.Call(
		SPI_SETFILTERKEYS,
		uintptr(unsafe.Sizeof(settings)),
		uintptr(unsafe.Pointer(&settings)),
		SPIF_UPDATEINIFILE|SPIF_SENDCHANGE,
	)
	if ret == 0 {

		return err
	}
	return nil
}

func (a *App) GetSettings() (FilterKeysSettings, error) {
	var fk FilterKeysSettings
	fk.cbSize = uint32(unsafe.Sizeof(fk))

	ret, _, err := procSystemParametersInfo.Call(
		SPI_GETFILTERKEYS,
		uintptr(unsafe.Sizeof(fk)),
		uintptr(unsafe.Pointer(&fk)),
		0,
	)
	if ret == 0 {
		return fk, err
	}
	return fk, nil
}

func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}
