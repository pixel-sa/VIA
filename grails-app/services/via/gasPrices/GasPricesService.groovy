package via.gasPrices

import grails.transaction.Transactional
import org.jsoup.Jsoup
import org.jsoup.nodes.Document

@Transactional
class GasPricesService {


    def getLocalGasPrice(zipcode) {

        def url = "https://www.gasbuddy.com/home?search=" + zipcode + "&fuel=1"

        Document document = Jsoup.connect(url).get()

        def gasPrices =  document.getElementsByClass("ui header styles__priceHeader___38ONR")
        def avgPrice = gasPrices[1]
        avgPrice =  avgPrice.text()
        log.info(avgPrice)
        return avgPrice

    }
}
