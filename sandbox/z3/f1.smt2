(declare-fun max (Int Int) Int)

(assert (= (max 0 1) 1))
(assert (= (max 4 2) 4))

(check-sat)
(get-model)
