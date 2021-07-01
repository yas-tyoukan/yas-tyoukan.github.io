# -*- coding: utf-8 -*-

# z3をインポート
from z3 import *

#全ての変数valは1<=val<=9であることの制約を追加するメソッド
def betweenOneToNine(val,s):
    for i in range(n):
        for j in range(n):
            s.add(1 <= val[i][j], val[i][j] <= n)

#rowがそれぞれ他と値が異なっていることの制約を追加するメソッド
def distinctRow(val,s):
    for i in range(n):
        tmpList = []
        for j in range(n):
            tmpList.append(val[i][j])
        s.add(Distinct(tmpList))

#columnがそれぞれ他と値が異なっていることの制約を追加するメソッド
def distinctColumn(val,s):
    for i in range(n):
        tmpList = []
        for j in range(n):
            tmpList.append(val[j][i])
        s.add(Distinct(tmpList))

#ブロックの中身がそれぞれ他と値がことなっていることの制約を追加するメソッド
def distinctBlock(val,s):
    for k in range(3):
        for l in range(3):
            tmpList = []
            for i in range(3):
                for j in range(3):
                    tmpList.append(val[3*k+i][3*l+j])
            s.add(Distinct(tmpList))

#あるマス目に任意の数値をセットすることの制約を追加するメソッド
def setNum(val,s,x,y,num):
    s.add(val[x-1][y-1]==num)

#数独問題集上級001の問題設定の制約を追加するメソッド
#http://www.sudokugame.org/archive/printsudoku.php?nd=2&xh=1
def setProb001(val,s):
    setNum(val,s,2,6,1)
    setNum(val,s,2,8,8)
    setNum(val,s,3,1,6)
    setNum(val,s,3,2,4)
    setNum(val,s,3,7,7)
    setNum(val,s,4,6,3)
    setNum(val,s,5,3,1)
    setNum(val,s,5,4,8)
    setNum(val,s,5,6,5)
    setNum(val,s,6,1,9)
    setNum(val,s,6,7,4)
    setNum(val,s,6,9,2)
    setNum(val,s,7,6,9)
    setNum(val,s,7,7,3)
    setNum(val,s,7,8,5)
    setNum(val,s,8,1,7)
    setNum(val,s,8,5,6)
    setNum(val,s,9,5,2)

#n*n個の変数を用意
n = 9
val = [[Int("val[%d,%d]" % (i,j)) for j in range(n)] for i in range(n)]
s = Solver()

#制約を追加
betweenOneToNine(val,s)
distinctRow(val,s)
distinctColumn(val,s)
distinctBlock(val,s)
setProb001(val,s)

#充足可能性を判定、unsatならexit
r = s.check()
if r == sat:
    m = s.model()
    #印字
    for i in range(n):
        for j in range(n):
            print("%d " % m[ val[i][j] ].as_long(), end="")
        print()
else:
    print(r)
