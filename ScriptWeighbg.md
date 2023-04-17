if os.date("%d%m%y") >"160424" then
gg.alert ('Update Script My Channel \nWeigh')
os.exit() end
aurell = gg.alert([[
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                      {🇻🇳}  'SCRIPT BY Weigh'  {🇻🇳}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Thông Tin Của Bạn:
➪[1] ➣ Tên Người Dùng: Test
➪[2] ➣ Ngày kích hoạt: 17 Tháng 4 Năm 2023
➪[3] ➣ Hạn: Đến Ngày 20 Tháng 4 Năm 2023
➪[4] ➣ Key Sử Dụng: Key Test
➖➖➖➖➖➖➖➖➖➖➖
BẢN QUYỀN Weigh
➖➖➖➖➖➖➖➖➖➖➖
Mua Key Script Hoặc Gặp Lỗi Liên Hệ
☎️ ᴢᴀʟᴏ : 0929222771
━━━━━━━━━━━━━━━━━━━━━━━━━━━━]],"『 sᴛᴀʀ ↘️ 』")
function setvalue(address,flags,value) 
local quan={}
quan[1]={} 
quan[1].address=address
quan[1].flags=flags
quan[1].value=value
gg.setValues(quan) 
end
function searchValue(t,t1,t2)
rt={}
gg.setRanges(t1)
gg.clearResults()
gg.clearList()
gg.setVisible(false)
gg.searchNumber(t[1], t2)
local r = gg.getResults(100000)
if #r==0 then goto YotsubaNakano end
for it=2,#t do
for i=1,#r do
r[i].address=r[i].address+t[it][2]
end
local rr=gg.getValues(r)
tt={}
for i=1,#rr do
   if rr[i].value== t[it][1] then
   ii=#tt+1
   tt[ii]={}
   tt[ii].address=rr[i].address-t[it][2]
   tt[ii].flags=4
   end
end
if #tt==0 then goto YotsubaNakano end
r=gg.getValues(tt)
if it==#t then rt=r goto YotsubaNakano end
end
::YotsubaNakano::
return rt
end
function searchEdit(quan1,quan2,quan3)
if #r>0 then
tt={}
for i=1,#r do
ii=#tt+1 tt[ii]={}
tt[ii].address=r[i].address +quan1
tt[ii].flags=quan2
tt[ii].value=quan3
end
gg.setValues(tt)
end
end


function Weigh()



Mode = gg.choice({
'Blockman Go🇻🇳',
'Free Fire🇻🇳',
'Liên Quân Mobile🇻🇳',
'Exit↩ ',
},nil,'Chọn Game')
if Mode == nil then else
if Mode == 1 then A()end
if Mode == 2 then B()end
if Mode == 3 then C()end
if Mode == 4 then os.exit()end
end
MenuVisible = -1
end

function A()
function ModeA()
Mode = gg.multiChoice({
'Hitbox X3',
'Fly',
'Air Speed',
'Gravity',
'Fast Break',
'X2 Tầm Nhìn',
'Super Speed',
'Big Name',
'Back↩',},nil,' Blockman Go')
if Mode == nil then else
if Mode[1] == true then A1()end
if Mode[2] == true then A2()end
if Mode[3] == true then A3()end
if Mode[4] == true then A4()end
if Mode[5] == true then A5()end
if Mode[6] == true then A6()end
if Mode[7] == true then A7()end
if Mode[8] == true then A8()end
if Mode[9] == true then Weigh()end
end
MenuVisible = -1
end
function A1() 
gg.setRanges(gg.REGION_CODE_APP)
gg.searchNumber('4441630096515323890',gg.TYPE_QWORD)
gg.getResults(100000)
gg.editAll('4369572502477395954',gg.TYPE_QWORD)
gg.clearResults()
r=searchValue({'1070554153',{'1058642330',-24*4}},4,4)
if #r == 0 then else
searchEdit(-13*4,4,1058474557)
r=searchValue({'1070554153',{'1058474557',-13*4}},4,4)
if #r == 0 then else
searchEdit(-24*4,4,1058474557)
r=searchValue({'1070554153',{'1058474557',-13*4}},4,4)
if #r == 0 then else
searchEdit(-52*4,4,1058474557)
r=searchValue({'-1130328018',{'1058642330',-2*4}},4,4)
if #r == 0 then else
searchEdit(-2*4,4,1084000000)
r=searchValue({'1072064102',{'1058642330',16*4}},4,4)
if #r == 0 then else
searchEdit(16*4,4,1084000000)
gg.clearResults()
gg.setRanges(gg.REGION_CODE_APP)
gg.searchNumber(' 4369572502477395954',gg.TYPE_QWORD)
gg.getResults(100000)
gg.editAll(' 4441630096515323890',gg.TYPE_QWORD)
gg.clearResults()
end end end end end end
function A2 ()
gg.setRanges(gg.REGION_CODE_APP)
gg.searchNumber('0.0001',gg.TYPE_FLOAT)
gg.getResults(200)
gg.editAll('-1.3',gg.TYPE_FLOAT)
gg.clearResults()
end
function A3   ()
gg.setRanges(gg.REGION_C_ALLOC)
gg.searchNumber('0.02',
gg.TYPE_FLOAT)
gg.getResults(200)
gg.editAll('0.1601',
gg.TYPE_FLOAT)
gg.clearResults()
end
function A4   ()
gg.setRanges(gg.REGION_CODE_APP)
gg.searchNumber('0.08',
gg.TYPE_FLOAT)
gg.getResults(2)
gg.editAll('0.02',
gg.TYPE_FLOAT)
gg.clearResults()
end
function A5   ()
gg.searchNumber('h 01 00 00 00 00 00 00 00 00 00 00 00 03 00 00 00 D1 07 00 00 00 00 00 00 08 00 00 00 40 00 00 00 00 00 C8 42', gg.TYPE_BYTE)
gg.getResults(999)  
gg.editAll('h 01 00 00 00 00 00 00 00 00 00 00 00 03 00 00 00 D1 07 00 00 00 00 00 00 08 00 00 00 40 00 00 00 00 00 00 00', gg.TYPE_BYTE)
gg.clearResults()
gg.searchNumber('h 00 00 C8 42 D0 B5 02 AF 82 B0 D0 F8 00 C0 4F F0 7E 54 D7 F8 08 E0 DC F8 50 C0 CD E9 00 4E E0 47 02 B0 D0 BD F0 B5 03 AF 2D E9 00 0F 81 B0 2D ED 02 8B 86 B0 02 90 9A 46 55 48 00 92 78 44 00 68 00 68 05 90 08 46 01 90 91 F8 20 00 80 B1 51 48', gg.TYPE_BYTE)
gg.getResults(999)
gg.editAll('h 00 00 00 00 D0 B5 02 AF 82 B0 D0 F8 00 C0 4F F0 7E 54 D7 F8 08 E0 DC F8 50 C0 CD E9 00 4E E0 47 02 B0 D0 BD F0 B5 03 AF 2D E9 00 0F 81 B0 2D ED 02 8B 86 B0 02 90 9A 46 55 48 00 92 78 44 00 68 00 68 05 90 08 46 01 90 91 F8 20 00 80 B1 51 48', gg.TYPE_BYTE)
gg.clearResults()
end
function A6   ()
gg.setRanges(gg.REGION_CODE_APP)
gg.searchNumber('-1',
gg.TYPE_FLOAT)
gg.getResults(200)
gg.editAll('-2',
gg.TYPE_FLOAT)
gg.clearResults()
end
function A7   ()
gg.setRanges(gg.REGION_CODE_APP)
gg.searchNumber('-0.05',
gg.TYPE_FLOAT)
gg.getResults(200)
gg.editAll('-0.005',
gg.TYPE_FLOAT)
gg.clearResults()
end
function A8   ()

end
MenuVisible = -1
end

function A()
function ModeA()
Mode = gg.multiChoice({
'Hitbox X3',
'Fly',
'Air Speed',
'Gravity',
'Fast Break',
'X2 Tầm Nhìn',
'Super Speed',
'Big Name',
'Back↩',},nil,' Blockman Go')
if Mode == nil then else
if Mode[1] == true then A1()end
if Mode[2] == true then A2()end
if Mode[3] == true then A3()end
if Mode[4] == true then A4()end
if Mode[5] == true then A5()end
if Mode[6] == true then A6()end
if Mode[7] == true then A7()end
if Mode[8] == true then A8()end
if Mode[9] == true then Weigh()end
end
MenuVisible = -1
end
function A1() 
gg.setRanges(gg.REGION_CODE_APP)
gg.searchNumber('4441630096515323890',gg.TYPE_QWORD)
gg.getResults(100000)
gg.editAll('4369572502477395954',gg.TYPE_QWORD)
gg.clearResults()
r=searchValue({'1070554153',{'1058642330',-24*4}},4,4)
if #r == 0 then else
searchEdit(-13*4,4,1058474557)
r=searchValue({'1070554153',{'1058474557',-13*4}},4,4)
if #r == 0 then else
searchEdit(-24*4,4,1058474557)
r=searchValue({'1070554153',{'1058474557',-13*4}},4,4)
if #r == 0 then else
searchEdit(-52*4,4,1058474557)
r=searchValue({'-1130328018',{'1058642330',-2*4}},4,4)
if #r == 0 then else
searchEdit(-2*4,4,1084000000)
r=searchValue({'1072064102',{'1058642330',16*4}},4,4)
if #r == 0 then else
searchEdit(16*4,4,1084000000)
gg.clearResults()
gg.setRanges(gg.REGION_CODE_APP)
gg.searchNumber(' 4369572502477395954',gg.TYPE_QWORD)
gg.getResults(100000)
gg.editAll(' 4441630096515323890',gg.TYPE_QWORD)
gg.clearResults()
end end end end end end
function A2 ()
gg.setRanges(gg.REGION_CODE_APP)
gg.searchNumber('0.0001',gg.TYPE_FLOAT)
gg.getResults(200)
gg.editAll('-1.3',gg.TYPE_FLOAT)
gg.clearResults()
end
function A3   ()
gg.setRanges(gg.REGION_C_ALLOC)
gg.searchNumber('0.02',
gg.TYPE_FLOAT)
gg.getResults(200)
gg.editAll('0.1601',
gg.TYPE_FLOAT)
gg.clearResults()
end
function A4   ()
gg.setRanges(gg.REGION_CODE_APP)
gg.searchNumber('0.08',
gg.TYPE_FLOAT)
gg.getResults(2)
gg.editAll('0.02',
gg.TYPE_FLOAT)
gg.clearResults()
end
function A5   ()
gg.searchNumber('h 01 00 00 00 00 00 00 00 00 00 00 00 03 00 00 00 D1 07 00 00 00 00 00 00 08 00 00 00 40 00 00 00 00 00 C8 42', gg.TYPE_BYTE)
gg.getResults(999)  
gg.editAll('h 01 00 00 00 00 00 00 00 00 00 00 00 03 00 00 00 D1 07 00 00 00 00 00 00 08 00 00 00 40 00 00 00 00 00 00 00', gg.TYPE_BYTE)
gg.clearResults()
gg.searchNumber('h 00 00 C8 42 D0 B5 02 AF 82 B0 D0 F8 00 C0 4F F0 7E 54 D7 F8 08 E0 DC F8 50 C0 CD E9 00 4E E0 47 02 B0 D0 BD F0 B5 03 AF 2D E9 00 0F 81 B0 2D ED 02 8B 86 B0 02 90 9A 46 55 48 00 92 78 44 00 68 00 68 05 90 08 46 01 90 91 F8 20 00 80 B1 51 48', gg.TYPE_BYTE)
gg.getResults(999)
gg.editAll('h 00 00 00 00 D0 B5 02 AF 82 B0 D0 F8 00 C0 4F F0 7E 54 D7 F8 08 E0 DC F8 50 C0 CD E9 00 4E E0 47 02 B0 D0 BD F0 B5 03 AF 2D E9 00 0F 81 B0 2D ED 02 8B 86 B0 02 90 9A 46 55 48 00 92 78 44 00 68 00 68 05 90 08 46 01 90 91 F8 20 00 80 B1 51 48', gg.TYPE_BYTE)
gg.clearResults()
end
function A6   ()
gg.setRanges(gg.REGION_CODE_APP)
gg.searchNumber('-1',
gg.TYPE_FLOAT)
gg.getResults(200)
gg.editAll('-2',
gg.TYPE_FLOAT)
gg.clearResults()
end
function A7   ()
gg.setRanges(gg.REGION_CODE_APP)
gg.searchNumber('-0.05',
gg.TYPE_FLOAT)
gg.getResults(200)
gg.editAll('-0.005',
gg.TYPE_FLOAT)
gg.clearResults()
end
function A8   ()

end
while true do
if gg.isVisible(true) then
MenuVisible = 1
gg.setVisible(false)
end
if MenuVisible == 1 then
ModeA()
end end end
while true do
if gg.isVisible(true) then
MenuVisible = 1
gg.setVisible(false)
end
if MenuVisible == 1 then
Weigh()
end end
