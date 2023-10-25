# CarValueEstimatorUi

There will be two types of interfaces and an object
To show the options wee need OptionCar Object which has options as an array

OptionCar {
make : string;
model : [string];
}

Cars {
make: string;
model: string;
year: number;
distance: number;
transmission: string;
fuel_type: string;
}

## todo

- authentiaction ile login sayfası yap buton olmasına gerek yok url i paylaş eğitilen modelin marka seçeneklerini obje olarak ekleyebilmeliyiz if ile model var mı yok mu tarat, eğer var ise devam et yoksa ekle yeni objeyi. (eğer varsa update olacak yoksa create olacak post? fark eder mi sanırım etmez bir bak)
- send request ile sayfana gönder valueları ve diğer sayfada kart olarak bu değerleri oluşturup onaylıyor musunuz? de. Eğer onaylarsa database e gönder ve değer al dönüş olarak.
- Bu değeri de sonuç ekranında göster

1- giriş değerlerini güncelle ve bunu bir interface üzerinden al. Interface yapısını öğren.
2- ikinci sayfada bir kart oluştur.
3- ikinci sayfanın sonuçlarında post işlemi yap onaya bağlı.
4- geri dönüş değerini de ekleyerek sonucu kard olarak göster 3. sayfada. istek gönderildikten sonra bir yükleniyor simgesi konulabilir kart içerisinde.?
