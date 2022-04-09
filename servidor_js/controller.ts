@Get('/all-monedas')
async getMonedas(@Req() req, @Res() res) {
  try {
    const opciones: AxiosRequestConfig = {
      headers: {['X-CoinAPI-Key']: '98958498-EFD1-41D1-A285-C4ECD0FAC389'}
    }
    const url = 'https://rest.coinapi.io/v1/exchangerate/EUR?invert=false';
    const { data } = await firstValueFrom(this.httpService.get(url, opciones));
    const monedas: MonedasResponse = data;
    
    const respuesta = {
      asset_id_base: monedas.asset_id_base,
      rates: this.filterMyCoins(monedas)
    }
    return res.status(HttpStatus.OK).json({
      monedas: respuesta
    });
  } catch (err) {
    return res.status(err.response.statusCode).json({
      success: false,
      msg: err.response.message
    });
  }
}

private filterMyCoins(monedas: MonedasResponse): Rate[] {
  const misMonedas = ['BTC', 'ADA', 'ETH', 'SOL', 'ALGO'];

  const myRates: Rate[] = monedas.rates.filter((rate: Rate) => {
     return misMonedas.includes(rate.asset_id_quote);
  })
  return myRates;
}