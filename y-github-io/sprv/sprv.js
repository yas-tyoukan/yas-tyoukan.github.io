(function() {
	var baseUrl = location.href.split('?')[0];
	var baseIkaring = 'https://splatoon.nintendo.net';
	var baseImageDir = '/images/splatoon_weapons';

	var weaponIdMap = {
		"c5b48a8e03781a6d34f2978ac3a1a12f90b301be8f1f4d622a1796697ba603ce-6d54f2f565f920e198dee4b07cedf0e2e016c80cb1106d0855510e3537535502": {
			"name": "ヒーローチャージャーレプリカ"
		},
		"9f8bc13b5a7c929e0bb4b5e46f93a197b8407e55da3c421c3ef59979fb4ea8f2-f44cba31c82986e603929767900389be3ddc13b3d8709d035f2824dc24e833ac": {
			"name": "リッター3K"
		},
		"230a8eee09130d6cf9a1d32d29808fd5f0110a58d4998130cec89c4eaf58a977-a38870fcd2ca79d70673013b3b271e5a081cc5291f7b5568d6d5037ce02b9907": {
			"name": "3Kカスタム"
		},
		"1e971e6aecaa03575042e8050a0c8431edbec68b72f41527c1ca6ac9fd024741-29188a7c68ca54847cfcc9f36bc8b1186971b43c5f2d13758ccd6f19ae37c3f8": {
			"name": "スプラチャージャーワカメ"
		},
		"c624ffec5c28352485cb210ee152756cb6ca486b44e3b10dc4b9bf04ab953927-d4ccab6d2d8e88927f2e82ee0eedf79bf23130eaa0d19541e0d8aecc12f9e237": {
			"name": "デュアルスイーパー"
		},
		"ff801fb34b6acf0ccb763f2f98c98553ce5d298a144855b36ffed89730e358d2-0c0430e77b86233583dc986b978f860849e05e47fdfb03eb5016ba3f39d6adb0": {
			"name": "スプラローラーコラボ"
		},
		"aeb8e1fe59cf32f8755a44a704267405322b17b6926f1692e86aa9c9924dd795-66d35bd2f1ec8ebe7a50b3142485c73ace3e6b1fb76301bb04645739e58114d2": {
			"name": "N-ZAP89"
		},
		"d1f55d0d3a8a5bfd209e87b75b67567c98038873eef190bc25ef8ed1027d1d2c-ac82e0733af8b5c321f036108ae6670fb1de40b9c5467b0fd70dc5e205c4736b": {
			"name": ".96ガロンデコ"
		},
		"c9f7cead9ee5ada35437d7c2ea8ddae6ca1dacfc6c9b01d5939cfc0ff59fe0ea-75d3e2e49af530a200cf15bd3d1861f23c6aefbe49818c55a975166ae0be5065": {
			"name": "わかばシューター"
		},
		"87293e3e06bd09356e0f7515d77ac7bd00be416492c6e8c21879a627cd3babb9-16acbb83cca056ad0c556c427094702ca17f7cfbe069515b47dbba0670f9cfe7": {
			"name": "デュアルスイーパーカスタム"
		},
		"3359908b8a0baf5b2c28402ad74d1d754c5adc3f9971832fac75fd4344f5c428-a5e6a86a5f889975ee7bf7e298e099e54c26e4fc424012ba83f6a02635f67b71": {
			"name": ".52ガロン"
		},
		"de63b9c7c5f9f5ab76456328b11f2f6ac8f17c7c91ff402727625fc46d0a3055-979662ec33fbcb67c4b537aa3c76f8d96b3f014bd96b1d59129ce424282ba0d6": {
			"name": "プロモデラーRG"
		},
		"efe0cba0dfeb40bbea197c9ead9241bb719b8ed6bcd2131b339c45df051379b2-bc9048fd2c7d97b7f6e5cfc84ee127f677831fcbe992e052007e0b3f6ffc2859": {
			"name": "ホクサイ"
		},
		"ad5ce637d338080d1ce2c2703370f8616b4499eca84ecca24136b848de967331-976fc37a72e0c79f39ae18d60ae797b0dfada70dfbff8bcf7794e447489a71f1": {
			"name": "パブロ"
		},
		"8707d8047c8dbd35d6cefa2a08d55be9f939dcaea4db44b7e0e4aa599736cb01-40e4f73afe99981e3a8e751badf6625aa14f1abb73b14de1c5520780b6514373": {
			"name": "ホクサイヒュー"
		},
		"062629ff15ff75912af49ca5efc53e30e0fa183543774d0effa5d06939dddd74-cb4b49df9f818e6de35454c030ac15558637355762b2edc645aed7d589d272e4": {
			"name": "スプラローラー"
		},
		"686933ec4f43c67c153fd62984601c37d2a136c42878405724bb65020700937a-8880392f0bcc07587f0fcd322050c32ecec76b9014d58e498e9e75ccfeac3644": {
			"name": "スクイックリンα"
		},
		"be4595427ab39aec0bd5186280bc2003fe6003120e3a887124a8ebb1f65c9a18-45f9a6ca06f7e093b54cff4430367d1d0fe845feb958975e2a1b6d502f6874cb": {
			"name": "シャープマーカー"
		},
		"d78618b66b7562fbbb1a2455fa959216204890da362aca1b0726e09aad7b9408-161259bb30e994603c506758d7c3915871f90c45d927ac00f5b387db6d8b3c77": {
			"name": "ホットブラスターカスタム"
		},
		"b4c444616489c4e38cdb3ce282d6f69ba94f3e330b7d76d7208e8a672378ea8b-5c5fb092531635ed2060fa74e8ddd2e4d1c3f368ccba15b5fbdda12c5527cafb": {
			"name": "スプラスコープワカメ"
		},
		"6c38c99840cb78ad525e1e53e1c686397b1360e83ef71b9dd4cb62ad2ce38d92-2d1b21a09b8bb1c1f3fe9b24c39ee1b5f5030d646ec27dc9d96d455d5e39b6e6": {
			"name": "ジェットスイーパーカスタム"
		},
		"7bef265d011060ef6cf88033ec2ecd6a1c73790caefe7bcbd7be323cc3584cbd-3d7286bc44e08b8511dce53233dd08c2e18949bc6ba0306fd531bf63957bebd2": {
			"name": "プロモデラーMG"
		},
		"259b88ef89bc14c74559a6d05a14efa9482557e89190a39748a79031524b60c8-636716b2cb5e6d5e1d7597c26fb2643bd4689e1410fd3d978f4459df6af7a46a": {
			"name": "もみじシューター"
		},
		"ec3a13c7f0aef55dad5bb7bd3db5be6f21c943811d7cad14c6a74b18ab199605-5e51711d185c8293a2a9de3a5d0ea66504e128b906bf776b583f1a2e85b46d21": {
			"name": "N-ZAP85"
		},
		"37ea525217902df9a399b2ddac6b5443daa1e16cbb65f829c8427246ba12b13f-fd63034272880fb899eea7a91f30276d9965f23cdc461bb9736c382f99b513cf": {
			"name": "ヒーローシューターレプリカ"
		},
		"b73d45cca8d831e9b032f0642e4df95fcf1be1843df99e289b315adcab3c450d-c1242f37d2c6421057e480d513d4b8675d45067d23317be33de14fd6f2dbb0b6": {
			"name": ".52ガロンデコ"
		},
		"1a78b7b9c89c10a908b718f21a2efe4aa49f7b0e1b8e67f1a135ee89720b0a8a-556af728c32564db018b9bf7949908d7ac3bd689f627fb6cd34f12bc2b1502ac": {
			"name": "スプラチャージャーベントー"
		},
		"739840486a61b8252795a6668d02ce21f4b08415c95f7f737dbd77aba49cfa32-b7b22652b19acd392814a5229a995630ac78b2573a528000a80a4cc3a7106541": {
			"name": "パーマネントパブロ"
		},
		"e67b1303cfe0d3335e7e078244c84c17792e2fb54dbd789433fecaf102bd3362-33d9ac2388773c22daf3701a9a84bfd3f370e4d0045b5eff8c839d63bf654037": {
			"name": "スプラシューターコラボ"
		},
		"67980ff4205ba0792b96f6f19ccb6438c4b1a10d87d194f8d4261be33bb48805-958b4a882c87f810033febc193cd90cd24b06395ac19d5ae14e75950ba579792": {
			"name": "ボールドマーカー7"
		},
		"4c30e234da557cb93ea4e7282005edcf4112dc1b6a43124ad21f6c3b3366cfad-b2f510c818fd7372a51835fc258bd700db99c2387cd2ca7a3bac503d22c09c95": {
			"name": "ボールドマーカーネオ"
		},
		"234817cbabd95f27d60fb213122c1b98ef41a13457aa6b57a2e7dbf5f2fb8c71-eba5a75f732ad570ad8aee794c87179846d36cb5fa7d7cb86e63200f4716d95e": {
			"name": "スプラチャージャー"
		},
		"142657a7ff4bb94523b1dd730721a2020828e83e9dba2fe2dfe395c740989ae1-f75aaeda33fb56210947a1fef16de4580bde61f2fdd1d360ef044d90f6fb2032": {
			"name": "ラピッドブラスター"
		},
		"b55b9b85d532918a14c0c986a6962aadb619944dac31fd11b28208ef6836b90c-4f0f165906ac0a32337502f076a7710e4ab419f02759850540fa8867a8aa6aab": {
			"name": "ハイドラントカスタム"
		},
		"cd4b9d0fab7239d83e0d728826e565ba6bf64a8fa63eb81489345e1276c6600b-041694f6cffa810f940cbbe53ee5a66a36885e4e37cb1fca4bf868a744eabed3": {
			"name": "ダイナモローラー"
		},
		"de94a1dabe2d403274cc65d08516ae25db2c13fe9b9447f114612747a6151767-a284ac82b0a435f348d8bf5cfa3c1f91db79c5ecbd8aa9b829295b42b1947b9c": {
			"name": "パブロヒュー"
		},
		"282fd792a220632b6c34bfbb564629a67b9f540d1a1ab212f9e2f30c9174a820-d37606f38d32f835cba13f51c7459a328f1a69af466695d77e5aa06bfde77baf": {
			"name": "ホットブラスター"
		},
		"a1c5e419c8b284aa684726d27b2472b69d1a7215d570579d85ad657da7180f9a-4cdcf4ff2bd23bbd6374c53ac0ea3b8108db22fabca1f6d69bd4ed706923e2f1": {
			"name": "スプラスコープ"
		},
		"251c94c0f851f5227d7795735af968513ac8f008cd024043e86fdb87b1f089fa-175f924751223338878e1224bd6b0413547ce3a1e4d05a0c406f2c53b686b0bb": {
			"name": "バケットスロッシャー"
		},
		"44e2035a09dfc82a2484c48bb69ded59354e45cd4a2062f60a1fa2d0871773e0-9f953133e1799ddad5fe77b049ffa24a231f243c821e1ea5f87cebc17845e0c0": {
			"name": "L3リールガン"
		},
		"08ac41b5dfeb33c35fa2d03269f78ea4dad63b88cc6be3221b733897c7e82135-81423ad8280b959f4270235ab1e784199da46d1d5b828195589b878a3c4ae7ef": {
			"name": "バレルスピナー"
		},
		"2fee2bac1e22b2ef19107e3eb58aabc4fd54e9ced476d1d2ac0b7d176d11d2ba-3d43b9f386c43c89a2da28e89aa14a317ffc47cb3706caac7391991a3350cb9e": {
			"name": "スプラシューター"
		},
		"9420d3bda417cf06d492fe857c291467bee2890dbdfc9063f06ab5b606d80442-2e618f93b43ddbee6ec24a96c4ba60d12aea0659dcb400d3e03d5480af1af2cf": {
			"name": "Rブラスターエリート"
		},
		"24216c6e64d6d4a97cb76c642233b678a7d663a266a6501714c58094c3727766-b0668f4ba44a4ab13001ae07924b1d0e66fff2eb0b33b77c1ca3bef9c326dcb4": {
			"name": ".96ガロン"
		},
		"b44b45fcc1cfc3862796f01f5a99ba119929bbead5b2a89f316e90f481abcd4c-754e5732717e918a7619283b6d64e341eba0489ab7d08864239a83672d09f31b": {
			"name": "プライムシューター"
		},
		"3f309d25639d80baa19485f7ae6099c3d82ae3ef8ffd1f69786ecf7f868bc124-dfbd7772ebf39b887090458132630231c01896b7076ed0b9f3b68d95968732dd": {
			"name": "ヒッセンヒュー"
		},
		"73369ac2737480e9e992bc60d9c72e5f0a52fa2c6a9efeff88de6ce0d376b25a-56daf8099dd79b1ec059c191699d9f1a7ea0a2ff3381119f55da7abbacb47d0b": {
			"name": "スプラスピナーリペア"
		},
		"36fe4791f65cc1db834a4d040b22a2ea637e8ab75ad37ce3db4caea3247e30af-a14372f21c7a0c0c86ae500b1cbcc1826f9712970c4ce3f98c5eecb59114a6f1": {
			"name": "ノヴァブラスター"
		},
		"2e3b37440632af8895518ad0d97b7867e1823a50e1dd5039912d07e4adc5cc7a-082c8d6ccea17125e9e845e112495d9581488112366f9610c8ee904aaa344c51": {
			"name": "スプラスピナーコラボ"
		},
		"6b34ccae7b426b59c68e97fa699f0f5a1f799f524bfbdeb52989e0fce9a53039-702de5fdf12a09a4e1d3d283f607d5167189cddd9551e7b0fabd61a4bb8292f8": {
			"name": "ノヴァブラスターネオ"
		},
		"43a94c610c74e6d92b75424133d47d01b97b91f7fdb7ea904e385e2ed20c6149-36741a7c084a71888204e40d25a789e8181d21bbe41ded2e2bf691a1a88977b3": {
			"name": "プライムシューターコラボ"
		},
		"6009c0a233e080a8ab70d0fd291c23098e12bbf877cee983f5da31b36be4997a-6b0d757aadcf5b6e6cbafabee9c2d8d3a6a874d919f810592d5b0699de6f1734": {
			"name": "ダイナモローラーテスラ"
		},
		"79d770d4a8c5d062756ee1626ca635dc20acbe0c23ca20c0cf5c3891848cb965-84c5cf6fcb8fd25fae006795801e98acd199fe9a2b1df87741ddc6251979f96f": {
			"name": "ヒッセン"
		},
		"56f4e14ac7cb57af50030071da35700af501985ceca37351330eee6df0c2c2da-f5aa6b87a07a9a435adb173777c0a578881d08517a09cef92dc992ebd7d9b7fe": {
			"name": "ボールドマーカー"
		},
		"27151f9470ea6763ecf45269efae872ac1b8bb84d6efaae95a1cad01cf12791e-ac6d4070fedde68ace0bf9161f85ad8b1824851000b2892aa319e4e0b3a5b9e7": {
			"name": "14式竹筒銃乙"
		},
		"612e90b58d01f14c1f6858f933f55656d09d83283f125cdd272b58e1555c1186-3fa39135894e41cfc10959d058d3b54627aaba2c0974fd77c71a626122d99e39": {
			"name": "スプラスピナー"
		},
		"7ad0f51b984c6144e99cbda675e0234c513733c9ba4b9a100cf4487b2999f618-2f08737fbc25d0aeae2a9b5730b3e021839e23f293a2f69baa1f4b02a049c0ee": {
			"name": "3Kスコープ"
		},
		"e088d953b16e68118a3036a54b0eab02cdc00ea61ba4abfc85f1f98e83d49f4c-e1522a3f5663f7d3e8a65237b2fc3f82201dd56a3d9ce3bb3c008cca600c4e13": {
			"name": "カーボンローラー"
		},
		"a63ba19229be34cc366f6fab6e2a79d3fb4d4901cbeb4ea23170dab7e9beb7cd-be79214c675cf69074fcdebbd6cf761e55c07d5055eda4c7d36c2f508079e3e7": {
			"name": "スクリュースロッシャー"
		},
		"f9a34915ba879bea89ffb3293fc91ddb19d2fc4acf8a481f09b1222bc98ab080-97ac107d7bbb78b67c55516b6845c03aa98d657f98c1d289a7a241cbd70d162f": {
			"name": "14式竹筒銃甲"
		},
		"aab295e6db118bf0100e55885e1647df69d0f37ed7f3d1deae38a06082d175a6-1b229c9a08d9cd074ec54a8eb07986e2ddbe897f1cc8b2a01b2992f41b45750e": {
			"name": "L3リールガンD"
		},
		"8a5e4de6e62b281659e0573fd95576debfd96fb03d08ee6b0e9a81401a719dc9-9c35fae218b71b09d3700f712e70a33b3b79818daf150b106a9e75a64761af71": {
			"name": "14式竹筒銃丙"
		},
		"eb49639a24f7763d18c3d3375ec660395ae31bdf4227166f3c255d1f0b142717-f6516542da98eb9db0cef41a25e33a860a0fbc973fa7500250ab57fdd2c2b39e": {
			"name": "オクタシューターレプリカ"
		},
		"d97d42d7ac13478131330fbf3de80fc85c78a4d50fcc11cea7d9776385615396-3dc844b9e258c3a002b7753e806a6ead4d4fd11ab037f3835253516d10acf08e": {
			"name": "ジェットスイーパー"
		},
		"cfb91dda41634286360f37d61172e8c3a276ae2f89f7719c572f68576ea3ad7e-2235ce9d34b006cca6025fe5d41de53f76351c92eda50f3f969b114594e45c02": {
			"name": "ロングブラスター"
		},
		"5fb8ad7830c398b738bc972e25a966b6cf6e010b848c2f0dee2f8d936898158b-a71740a482e1e5be1c12f2de31d81f3c495afafb58cac9b2e7bed8b39732b802": {
			"name": "H3リールガン"
		},
		"6371a40e3e9e739422f28a44cf30c3e613ee39ddcc021aba9c5c7909250539a0-be189632571828b3a9efdceb0be0a8e38591409e290a468ec3c146fc51d40c81": {
			"name": "バレルスピナーデコ"
		},
		"eeece3664b74f630f68f923b2a423e0ba3a1859d4abf36a1ee96056025de1f1e-d373276fdadda8b2fbb260b2310273eea95f23de3dd0836fcc384a2ae8f3f147": {
			"name": "ラピッドブラスターデコ"
		},
		"dd1711429bdfe5bd809762b23811e648e47f1d7bf51f48de6f7759cb68ec15aa-f4cd6d67badfe5607f0464eb9d2d9810d9bf63e6882f3507ae485f4b60b4184a": {
			"name": "ハイドラント"
		},
		"58105e03607ff7ee7f8837c42ac46d4500a65b3481845a07abea5d7a0c7dc9ea-2b3149136e5e33d20574c8da1d3fa5a5b940953816e1b5d45c793bc252f318b9": {
			"name": "スクリュースロッシャーネオ"
		},
		"5fb8898f8ce4c15bb16ec7530531f90743475ea2824561e7ac7b386b330a4364-83b3234bc259e68a22d0f32b22247164e484347854fdecb12eed27b911ab7923": {
			"name": "カーボンローラーデコ"
		},
		"017d74dcd5f231dd4c1eeb3b49e850cf253926b99fde425e1ad8b617707245a4-0c4d68f65fb1ab1683a15dde7805b452c1e96e40b075545753ed49821a4c408a": {
			"name": "スクイックリンγ"
		},
		"0005d0c1f017e6fe6601282187125619b2c036fdb26ec8b948c8c40d3449159c-667ae2aec7d30216f10f4f1f1bb469b7289c12521347ad041c5e8423d47192b7": {
			"name": "スプラスコープベントー"
		},
		"fe8da69077740b1db12a2e1cc2375231271fee3d05ee0f5ba54d9bde83a4baab-160b3b81f7f71c3c25bfe14d722b97761c586374b98864b56640900ea912eba9": {
			"name": "スクイックリンβ"
		},
		"96dcf4f0b4224c5eb9b07850af74912358b8eb521ac3668ad72ffc78af3861ca-eeea411288ae0dd83688ea6b2373973fd0256dd98b5fe492391a0a4c5d0432ff": {
			"name": "Rブラスターエリート"
		},
		"ddd6a002bf375420d00e996de139475a977f17898dfa33fa3a4661d77976c38a-ee5c5d1f0fe6888d0b4c0d81372936b980a7ca5c866f7fccebd7bc32131e7516": {
			"name": "H3リールガンチェリー"
		},
		"b5fe8e89fe8c36b356f2265eb92096571528fbd40776391e853b262c37a0f8a0-e72edd584ef15e68cab618fcbdccfbc070746d5fd654648a31ff90d81ba4c262": {
			"name": "ヒーローローラーレプリカ"
		},
		"91fb83a0943ba211e2e13281758b5f4de5f1989647f9b8810e4c5823722b1e0c-c52ffa69dc784ceaed807eed1636e4f409ae22634cabd3896aaaf95f1df4654f": {
			"name": "バレルスピナーリミックス"
		},
		"421271a78563e434a4b79579be720a33fd5cee461cf517862858b6fed6a0e058-73a04154c7a9e07991e9e8f7c6d34b616431ca7d6a3b1f1d7fc97e59e4ee1f9a": {
			"name": "シャープマーカーネオ"
		},
		"bd2f37f3bea997e4c6752a5e30657159c40d4e45d46b7e4f73e927b3d15ec261-77ce4e2d28d1651d3973724d4fde2ac00565fa16bdf01fc2426e8a188b84f39c": {
			"name": "H3リールガンD"
		},
		"45eab6318ef9aa736036106a96d09ec4effafb118860ce6fd10036f301359b78-df8a83db2618e148266ca7fc2c322d7c6a2ec881e0113ff842ca179e38cc9c69": {
			"name": "N-ZAP83"
		},
		"456535821d077524a06b46347ac177be89a164c6333932a0ff17ad2fd3a2059c-297bcdd2ae08182a9438030327c7016abbbb06ba3ae24787a5a52c914eecb4fb": {
			"name": "ロングブラスターネクロ"
		},
		"1610a5bfcddbd258fed1bd2262aa7eafb867d4c4b8dd7bfb3493c79d51ebf750-14dd7e41ff51358233d8f82bc03140675f6240bce86718fcde1b23361f8e421b": {
			"name": "プロモデラーPG"
		},
		"f4a3cedfdd3d4119ddcc5c3ea2d327e63e1159250f2fccef4cc3692bfd3de973-06a06bd34d9ef1a27764c1e187a7e66c6a5ae224f5ea71b8f5c55690b6426c40": {
			"name": "バケットスロッシャーデコ"
		},
		"94ba5a26a250d54de3510d2c252d40a5f489eee19563b8e153f73128879e19de-69d793db9ecc17390f1b116509e7504caef23a3a7968db0455c4028eef4a8045": {
			"name": "スプラシューターワサビ"
		},
		"6c76f1afc2956b053e35e649800a21aa2efe44518f7208d2ccb8d179e4f02247-db85ea2fb2e65cfc4e5fef27cf7825cc373da5d5dfa8ad5e854d87b310fb2b5b": {
			"name": "3Kスコープカスタム"
		},
		"0b1c45c1490a76251a4a4e4e7d51521ffec6ef07098bba811cb4dbd24694980d-e8c7930ad5aed946c6fb7a8c27101153cc88ec342144d1f8e4f18d5b69281932": {
			"name": "プライムシューターベリー"
		},
		"9f39d37e7eb03c0d975d72710602452c6e939c5faf8d44c1cc5aa3766dc670ec-4e849d1bab5ca76c6e7f7d3e6bbbb06de574459941596868e106309811a2b4d9": {
			"name": "ロングブラスターカスタム"
		},
		"57b4fbb7dce52c9cc99734964109f85b67b7e6c8e8edc6eda2820e8f7f7f5f82-5615f27bb4c2840d835887f5c7e4c0d5b667d2d5f37ba7e9b650bbfd2edd7434": {
			"name": "ダイナモローラーバーンド"
		},
		"cd409da57775c7ce7b987195c426d1c075669350538ad8f8eeb756e43468fbe1-a426a19806b5230bfb95bd7f463f9faa5a16eec7f5d24fcbb2ee8f439597cd13": {
			"name": "バケットスロッシャーソーダ"
		},
		"fc4118d94dfbff16ce4283298a86d27530e02bffbecdf8fbd4928ed0457fc02b-9e0e7d2eb18552f39a47e4e9f965b0b56ac4de86d9ea4f5f1fd9410861b6e9c7": {
			"name": "スプラローラーコロコロ"
		}
	};

	var controller = {
		__name: 'SPRVController',
		__init: function() {
			if (!window.opener) {
				$(function() {
					$('.how2use').css('display', 'block');
					var $jscode = $('.jscode');
					$jscode.val($jscode.val().replace(/#\{location\}/, baseUrl));
				});
				this._how2ViewMode = true;
				return;
			}
			var indicator;
			var loaded = false;
			$(function() {
				if (loaded) {
					return;
				}
				indicator = h5.ui.indicator({
					target: 'main',
					message: 'ロードちゅう'
				});
				indicator.show();
			});
			window.addEventListener('message', function receiveMessage(ev) {
				if(baseIkaring !== ev.origin){
					return;
				}
				loaded = true;
				if (indicator) {
					indicator.hide();
				}
				var rankData = JSON.parse(ev.data);
				var $weaponList = $('.weapon-list');
				for (var i = 0, l = rankData.length; i < l; i++) {
					var $img = $('<img>');
					var id = rankData[i].i;
					var point = rankData[i].p;
					var src = baseImageDir + '/' + id + '.png';
					var name = weaponIdMap[id].name;
					h5.core.view.append($weaponList, 'row', {
						src: src,
						name: name,
						point: point
					});
				}
				indicator.hide();
			}, false);
			window.opener.postMessage('requestRankData', baseIkaring);
		},
		'.toggleWeaponName click': function() {
			if (this._how2ViewMode) {
				return;
			}
			this.$find('.row_weapon .name').toggleClass('hidden');
		},
		'.toggleWeaponImg click': function() {
			if (this._how2ViewMode) {
				return;
			}
			this.$find('.row_weapon .img').toggleClass('hidden');
		},
		'.incrementColumn click': function() {
			if (this._how2ViewMode) {
				return;
			}
			var $ul = this.$find('.weapon-list');
			var count = $ul.css('column-count');
			$ul.css('column-count', parseInt(count) + 1);
		},
		'.decrementColumn click': function() {
			if (this._how2ViewMode) {
				return;
			}
			var $ul = this.$find('.weapon-list');
			var count = $ul.css('column-count');
			if (count > 1) {
				$ul.css('column-count', parseInt(count) - 1);
			}
		},
		'.showIssueDialog click': function() {
			this.$find('.issue-dialog')[0].showModal();
		},
		'.closeIssueDialog click': function() {
			this.$find('.issue-dialog')[0].close();
		}
	};
	$(function() {
		h5.core.controller(document.body, controller);
	});
})();
